// 'use client'
// import React, { useState } from "react";
// import ButtonUpload from "../../dashboard/components/button";
// import { DataTable } from "../../dashboard/components/table";
// import { UpArrow,} from "@/assets/icon";
// import BoardFilter from "../../dashboard/components/board";
// import { TransactionColumns } from "@/app/data/transaction";
// // import { OverviewColumns, OverviewData } from "@/app/data/overviewData";

// export default function Overview() {
//   const [transaction, setTransaction] = useState([]);
//   // const [filter, setFilter] = useState('');
//   // const OverviewDatas = OverviewData.map((data,index) => {
//   //   return {
//   //       id: index,
//   //       name: data.name,
//   //       number: data.number,
//   //       asset: data.asset,
//   //       dividend: data.dividend,
//   //       withdrawable: data.withdrawable,

//   //   };
//   // })

//   return (
//     <div className="">

//       <BoardFilter text='Your Requests'>
//       <ButtonUpload text="Request Report" icon={<UpArrow/>}  link="requestSms"/>
//       </BoardFilter>
//       <div>
//         <DataTable data={OverviewDatas} columns={TransactionColumns}/>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { fetchTransaction, fetchTransactionUser } from "./action";
import handleErrors from "@/app/data/handleErrors";
// import { fetchMonths, fetchYears } from "../upload-ledger/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/app/components/Spinner";
import ButtonUpload from "../../dashboard/components/button";
import { DataTable } from "../../dashboard/components/table";
import BoardFilter from "../../dashboard/components/board";
import { TransactionColumns } from "@/app/data/transaction";
import { UpArrow } from "@/assets/icon";
import { fetchMonths, fetchYears } from "../requestSms/action";

export default function Transaction() {
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const dispatch = useDispatch();

  const { userInfo} = useSelector((state) => state.userAuth);


  useEffect(() => {
    const loadYears = async () => {
      try {
        const allYears = await fetchYears();
        setYears(Object.values(allYears.months));
      } catch (error) {
        setErrors("Failed to load years.");
      }
    };
    loadYears();
  }, []);

  useEffect(() => {
    const loadMonths = async () => {
      try {
        const monthData = await fetchMonths();
        const formattedMonths = Object.entries(monthData.months).map(
          ([key, value]) => ({
            key,
            value,
          })
        );
        setMonths(formattedMonths);
      } catch (error) {
        setErrors("Failed to load months.");
      }
    };
    loadMonths();
  }, []);


  useEffect(() => {
    const fetchTransactions = async () => {
      if (!selectedYear && !selectedMonth) return;
      setLoading(true);
      setTransaction([]);
      
      try {
        console.log("Fetching transactions for user ID:", userInfo.id);
        const response = await fetchTransactionUser({
          month: parseInt(selectedMonth),
          year: parseInt(selectedYear),
          member_id: userInfo.id,
        });

  
        if (response.length === 0) {
          setErrors("No record found for request period.");
        } else {
          const transactions = response.map((transaction, index) => ({
            id: index + 1,
            member_name: transaction.member_name,
            total_contribution: transaction.total_contribution,
            total_dividend: transaction.total_dividend,
            withdrawable_dividend: transaction.withdrawable_dividend,
            month: transaction.month,
            year: transaction.year,
            date: transaction.date,
            uploaded_by: transaction.uploaded_by,
          }));
          setTransaction(transactions);
          setErrors(null);
        }
      } catch (error) {
        handleErrors(error, setErrors);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedMonth, selectedYear, userInfo.id]);

  return (
    <div className="md:px-6 py-10 sm:px-1 m-3">
      <div className="flex justify-end mr-10">
      <ButtonUpload text="Request Report" icon={<UpArrow/>}  link="requestSms"/>
      </div>
      <form>
     
        <div className="flex flex-col my-5 md:p-5 w-full lg: shadow-sm rounded-md mx-auto">
          {error && <p className="pb-8 text-red-700 text-sm">{error}</p>}
          <BoardFilter text="Transaction History">
            <div className="flex md:flex-row flex-col gap-6 mb-5">
              <Select onValueChange={(value) => setSelectedYear(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={selectedYear || "Select Year"} />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={String(year)}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setSelectedMonth(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={selectedMonth || "Select Month"} />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={String(month.value)}>
                      {month.key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </BoardFilter>
          {loading ? (
            <div className="flex justify-center items-center mt-20">
              <Spinner
                className="border-2 border-primary"
                size={9}
                spin={loading}
              />
            </div>
          ) : transaction.length > 0 ? (
            <DataTable data={transaction} columns={TransactionColumns} />
          ) : (
            <p className="text-center text-gray-600">No record found for request period</p>
          )}
          {/* No record found for request period */}
        </div>
      </form>
    </div>
  );
}
