// "use client";
// import React, { useEffect, useState } from "react";
// import { fetchTransaction } from "./action";
// import handleErrors from "@/app/data/handleErrors";
// import { fetchMonths, fetchYears } from "../upload-ledger/action";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { getAllMembers } from "@/Services/membersServie";
// import Spinner from "@/app/components/Spinner";
// import { DataTable } from "../components/table";

// export default function Transaction() {
//   const [transaction, setTransaction] = useState();
//   const [loading, setLoading] = useState(false);
//   const [error, setErrors] = useState();
//   const [years, setYears] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const dispatch = useDispatch();
//   const router = useRouter();

//   useEffect(() => {
//     const loadMembers = async () => {
//       try {
//         const response = await dispatch(
//           getAllMembers(["id", "first_name", "last_name"])
//         );
//         setMemberData(response.payload);
//       } catch (error) {
//         handleErrors(error, setErrors("Failed to load member data."));
//       }
//     };
//     loadMembers();
//   }, [dispatch]);

//   //fetch loads years
//   useEffect(() => {
//     const loadYears = async () => {
//       try {
//         const allYears = await fetchYears();
//         const yearArray = Object.values(allYears.months);
//         setYears(yearArray);
//       } catch (error) {
//         handleErrors(error, setErrors("The year field is required."));
//       }
//     };
//     loadYears();
//   }, []);

//   useEffect(() => {
//     // if(selectedYear){
//     const loadMonths = async () => {
//       try {
//         const monthData = await fetchMonths();
//         const monthsArray = Object.keys(monthData.months);

//         setMonths(monthsArray);
//       } catch (error) {
//         handleErrors(error, setErrors("The month field is required."));
//       }
//     };
//     loadMonths();
//   }, []);

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       setLoading(true);
//       try {
//         const transactions = await fetchTransaction({ month, year, id });
//         console.log(transactions);
//         setTransaction(transactions);
//       } catch (error) {
//         handleErrors(error, setErrors);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTransactions();
//   }, [month, year, id]);
//   return (
//     <div className="md:px-6 py-10 sm:px-14 m-3">
//       <div className="flex items-center gap-8">
//         <Link
//           href="uploaded"
//           className="flex items-center gap-2 font-normal  cursor-pointer "
//         >
//           <Back />
//           <p>Back</p>
//         </Link>

//         <h1 className="font-bold text-2xl">Upload Ledger</h1>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="bg-white flex flex-col justify-center my-5 md:my-20 md:p-10 p-5 w-full lg:w-3/5 shadow-sm rounded-md mx-auto items-center">
//           <div>
//             {errors && <p className="pb-8 text-red-700 text-sm">{errors}</p>}
//           </div>

//           <div className="flex gap-6 mb-16">
//             <Select onValueChange={(value) => setSelectedYear(value)}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder={selectedYear || "Select Year"} />
//               </SelectTrigger>
//               <SelectContent>
//                 {years.map((year) => (
//                   <SelectItem key={year} value={String(year)}>
//                     {year}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select onValueChange={(value) => setSelectedMonth(value)}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder={selectedMonth || "Select months"} />
//               </SelectTrigger>
//               <SelectContent>
//                 {months.map((month) => (
//                   <SelectItem key={month} value={month}>
//                     {month}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//             <Select onValueChange={(value) => setSelectedMember(value)}>
//               <SelectTrigger className="w-[200px]">
//                 <SelectValue placeholder="Select Member" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Members</SelectItem>{" "}
//                 {/* Add All Members Option */}
//                 {members.map((member) => (
//                   <SelectItem key={member.id} value={String(member.id)}>
//                     {member.first_name} {member.last_name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//       <div>
//       {loading ? (
//           <div className="flex justify-center items-center mt-32">
//             <Spinner
//               spin={loading}
//               className="border-2 border-primary "
//               size={9}
//             />
//           </div>
//         ) :
//         (
//           <DataTable data={members} columns={columnsWithActions}/>
//         )}

//       </div>
//           {/* <Button spin={loading} disabled={loading} className="w-2/6 my-5">
//             Save
//           </Button> */}
//         </div>
//       </form>
//     </div>
//   );
// }

// "use client";
// import React, { useEffect, useState } from "react";
// import { fetchTransaction } from "./action";
// import handleErrors from "@/app/data/handleErrors";
// import { fetchMonths, fetchYears } from "../upload-ledger/action";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useDispatch } from "react-redux";
// import { getAllMembers } from "@/Services/membersServie";
// import Spinner from "@/app/components/Spinner";
// import { DataTable } from "../components/table";
// import BoardFilter from "../components/board";
// import { TransactionColumns } from "@/app/data/transaction";

// export default function Transaction() {
//   const [transaction, setTransaction] = useState();
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setErrors] = useState();
//   const [years, setYears] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedMember, setSelectedMember] = useState("all");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const loadMembers = async () => {
//       try {
//         const response = await dispatch(
//           getAllMembers(["id", "first_name", "last_name"])
//         );
//         setMembers(response.payload);
//       } catch (error) {
//         setErrors("Failed to load member data.");
//       }
//     };
//     loadMembers();
//   }, [dispatch]);

//   useEffect(() => {
//     const loadYears = async () => {
//       try {
//         const allYears = await fetchYears();
//         setYears(Object.values(allYears.months));
//       } catch (error) {
//         setErrors("Failed to load years.");
//       }
//     };
//     loadYears();
//   }, []);

//   useEffect(() => {
//     const loadMonths = async () => {
//       try {
//         const monthData = await fetchMonths();
//         setMonths(Object.keys(monthData.months));
//       } catch (error) {
//         setErrors("Failed to load months.");
//       }
//     };
//     loadMonths();
//   }, []);

//   const fetchTransactions = async () => {
//     setLoading(true);
//     try {
//       const response = await fetchTransaction({
//         month: selectedMonth,
//         year: selectedYear,
//         id: selectedMember === "all" ? null : selectedMember,
//       });
//       const transactions = response.map((transaction, index) => ({
//         id: index + 1,
//         member_name: transaction.member_name,
//         total_contribution: transaction.total_contribution,
//         total_dividend: transaction.total_dividend,
//         withdrawable_dividend: transaction.withdrawable_dividend,
//         month: transaction.month,
//         year: transaction.year,
//         date: transaction.date,
//         uploaded_by: transaction.uploaded_by,
//       }));

//       console.log(transactions);
//       setTransaction(transactions);
//     } catch (error) {
//       handleErrors(error, setErrors);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchTransactions();
//   };

//   return (
//     <div className="md:px-6 py-10 sm:px-1 m-3">
//       <form onSubmit={handleSubmit}>
//         <div className=" flex flex-col my-5 md:p-1 p-5 w-full lg: shadow-sm rounded-md mx-auto">
//           {error && <p className="pb-8 text-red-700 text-sm">{error}</p>}
//           <BoardFilter text="Transaction History">
//             <div className="flex gap-6 mb-5">
//               <Select onValueChange={(value) => setSelectedYear(value)}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder={selectedYear || "Select Year"} />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {years.map((year) => (
//                     <SelectItem key={year} value={String(year)}>
//                       {year}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <Select onValueChange={(value) => setSelectedMonth(value)}>
//                 <SelectTrigger className="w-[180px]">
//                   <SelectValue placeholder={selectedMonth || "Select Month"} />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {months.map((month) => (
//                     <SelectItem key={month} value={month}>
//                       {month}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               <Select onValueChange={(value) => setSelectedMember(value)}>
//                 <SelectTrigger className="w-[200px]">
//                   <SelectValue
//                     placeholder={selectedMember || "Select Member"}
//                   />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Members</SelectItem>
//                   {members.map((member) => (
//                     <SelectItem key={member.id} value={String(member.id)}>
//                       {member.first_name} {member.last_name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </BoardFilter>
//           {loading ? (
//             <Spinner className="border-2 border-primary" size={9} />
//           ) : (
//             <DataTable data={transaction || []} columns={TransactionColumns} />
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { fetchTransaction } from "./action";
import handleErrors from "@/app/data/handleErrors";
import { fetchMonths, fetchYears } from "../upload-ledger/action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { getAllMembers } from "@/Services/membersServie";
import Spinner from "@/app/components/Spinner";
import { DataTable } from "../components/table";
import BoardFilter from "../components/board";
import { TransactionColumns } from "@/app/data/transaction";

export default function Transaction() {
  const [transaction, setTransaction] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState();
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2024"); // Default year
  const [selectedMonth, setSelectedMonth] = useState("1"); // Default month
  const [selectedMember, setSelectedMember] = useState("all");
  const dispatch = useDispatch();

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await dispatch(
          getAllMembers(["id", "first_name", "last_name"])
        );
        setMembers(response.payload);
      } catch (error) {
        setErrors("Failed to load member data.");
      }
    };
    loadMembers();
  }, [dispatch]);

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
        setMonths(Object.keys(monthData.months));
      } catch (error) {
        setErrors("Failed to load months.");
      }
    };
    loadMonths();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetchTransaction({
          month: selectedMonth,
          year: selectedYear,
          id: selectedMember === "all" ? null : selectedMember,
        });
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
      } catch (error) {
        console.log(error);
        
        handleErrors(error, setErrors);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedMonth, selectedYear, selectedMember]);

  return (
    <div className="md:px-6 py-10 sm:px-1 m-3">
      <div className="flex flex-col my-5 md:p-1 p-5 w-full lg:shadow-sm rounded-md mx-auto">
        {error && <p className="pb-8 text-red-700 text-sm">{error}</p>}
        <BoardFilter text="Transaction History">
          <div className="flex gap-6 mb-5">
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
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedMember(value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={selectedMember || "Select Member"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                {members.map((member) => (
                  <SelectItem key={member.id} value={String(member.id)}>
                    {member.first_name} {member.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </BoardFilter>
        {loading ? (
          <Spinner className="border-2 border-primary" size={9} />
        ) : (
          <DataTable data={transaction} columns={TransactionColumns} />
        )}
      </div>
    </div>
  );
}
