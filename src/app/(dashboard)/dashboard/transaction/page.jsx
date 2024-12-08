
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
//   const [transaction, setTransaction] = useState([]);
//   const [members, setMembers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState();
//   const [years, setYears] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [selectedYear, setSelectedYear] = useState("2024"); // Default year
//   const [selectedMonth, setSelectedMonth] = useState("1"); // Default month
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

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       setLoading(true);
//       try {
//         const response = await fetchTransaction({
//           month: selectedMonth,
//           year: selectedYear,
//           id: selectedMember === "all" ? null : selectedMember,
//         });
//         const transactions = response.map((transaction, index) => ({
//           id: index + 1,
//           member_name: transaction.member_name,
//           total_contribution: transaction.total_contribution,
//           total_dividend: transaction.total_dividend,
//           withdrawable_dividend: transaction.withdrawable_dividend,
//           month: transaction.month,
//           year: transaction.year,
//           date: transaction.date,
//           uploaded_by: transaction.uploaded_by,
//         }));
//         setTransaction(transactions);
//       } catch (error) {
//         console.log(error);

//         handleErrors(error, setErrors);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (selectedYear && selectedMonth) {
//       fetchTransactions();
//     }
//   }, [selectedMonth, selectedYear, selectedMember]);

//   return (
//     <div className="md:px-6 py-10 sm:px-1 m-3">
//       <div className="flex flex-col my-5 md:p-1 p-5 w-full lg:shadow-sm rounded-md mx-auto">
//         {errors && <p className="pb-8 text-red-700 text-sm">{errors.message}</p>}
//         <BoardFilter text="Transaction History">
//           <div className="flex gap-6 mb-5">
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
//                 <SelectValue placeholder={selectedMonth || "Select Month"} />
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
//                 <SelectValue placeholder={selectedMember || "Select Member"} />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Members</SelectItem>
//                 {members.map((member) => (
//                   <SelectItem key={member.id} value={String(member.id)}>
//                     {member.first_name} {member.last_name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </BoardFilter>

//         {loading ? (
//           <Spinner className="border-2 border-primary" size={9} />
//         ) : (
//           <DataTable data={transaction} columns={TransactionColumns} />
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { fetchTransaction } from "./action";
import handleErrors from "@/app/data/handleErrors";
import { fetchMonths, fetchYears } from "../upload-ledger/action";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

export default function Transaction() {
  const [transaction, setTransaction] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMember, setSelectedMember] = useState("all");
  const dispatch = useDispatch();
  const router = useRouter();

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
        const response = await fetchTransaction({
          month: selectedMonth,
          year: selectedYear,
          id: selectedMember === "all" ? null : selectedMember,
        });
        if (response.length === 0) {
          setErrors("No transactions found for the selected criteria.");
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
  }, [selectedMonth, selectedYear, selectedMember]);

    // Actions for table
    // const handleActions = {
    //   edit: (transaction) => {
    //     if (transaction.id) {
    //       router.push(`/dashboard/editTransaction?id=${transaction.id}`);
    //     }
    //   },
    // };;

  const columnsWithActions = TransactionColumns.map((column) =>
    column.id === "actions"
      ? {
          ...column,
          cell: ({ row }) => (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0  ">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem onClick={() => handleActions.edit(row.original)}>Edit</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
          ),
        }
      : column
  );

  return (
    <div className="md:px-6 py-10 sm:px-1 m-3">
      <form>
        <div className="flex flex-col my-5 md:p-1 p-5 w-full lg: shadow-sm rounded-md mx-auto">
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
                    <SelectItem key={month.value} value={String(month.value)}>
                      {month.key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setSelectedMember(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue
                    placeholder={selectedMember || "Select Member"}
                  />
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
            <div className="flex justify-center items-center mt-20">

              <Spinner
                className="border-2 border-primary"
                size={9}
                spin={loading}
              />
            </div>
          ) : transaction.length > 0 ? (
            <DataTable data={transaction} columns={columnsWithActions} />
          ) : (
            <p className="text-center text-gray-600">No transactions found.</p>
          )}
        </div>
      </form>
    </div>
  );
}
