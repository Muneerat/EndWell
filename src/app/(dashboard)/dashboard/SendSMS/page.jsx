"use client";
import React, { useEffect, useState } from "react";
import UploadFile from "../components/upload";
import Button from "@/app/components/Button";
import { Back } from "@/assets/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Label from "@/app/components/label";
import { fetchMonths, fetchYears } from "../upload-ledger/action";
import { fetchMessageParameters, sendTransactionSms } from "./action";
import { addToast } from "@/Store/features/toastSlice";
import handleErrors from "@/app/data/handleErrors";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { getAllMembers } from "@/Services/membersServie";
import { useRouter } from "next/navigation";

export default function SendSMS() {
  const [file, setFile] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [messageParameters, setMessageParameters] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [errors, setErrors] = useState("");
  const [processing, setProcessing] = useState(false);
  const [memberId] = useState(1);
  const dispatch = useDispatch();
  const [members, setMemberData] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await dispatch(
          getAllMembers(["id", "first_name", "last_name"])
        );
        setMemberData(response.payload);
      } catch (error) {
        handleErrors(error, setErrors("Failed to load member data."));
      }
    };
    loadMembers();
  }, [dispatch]);

  useEffect(() => {
    const loadMessageParameters = async () => {
      try {
        const messageData = await fetchMessageParameters();
        setMessageParameters(messageData);
      } catch (error) {
        handleErrors(error, setErrors("Failed to load message parameters."));
      }
    };
    loadMessageParameters();
  }, []);

  useEffect(() => {
    const loadYears = async () => {
      try {
        const allYears = await fetchYears();
        setYears(Object.values(allYears.months));
      } catch (error) {
        handleErrors(error, setErrors("The year field is required."));
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
        handleErrors(error, setErrors("The month field is required."));
      }
    };
    loadMonths();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedYear || !selectedMonth || !messageText || !selectedMember) {
      setErrors("Please select a year, month, member, and enter a message.");
      return;
    }

    const formData = new FormData();
    formData.append("year", selectedYear);
    formData.append("month", selectedMonth);
    formData.append("message", messageText);

    // Add specific logic for all members
    if (selectedMember === "all") {
      formData.append("member_id", "all"); 
    } else {
      formData.append("member_id", selectedMember); 
    }

    setProcessing(true);

    try {
      const response = await sendTransactionSms(formData);
      setErrors("");
    
      dispatch(
        addToast({
          type: "success",
          message: response,
        })
      );
      router.push('/dashboard/sms')
      
    } catch (error) {
      handleErrors(error, setErrors(error.message));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="md:px-6 py-10 sm:px-14 m-3">
      <div className="flex items-center gap-8">
        <Link
          href="sms"
          className="flex items-center gap-2 font-normal cursor-pointer"
        >
          <Back />
          <p>Back</p>
        </Link>
        <h1 className="font-bold text-2xl">Send SMS</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white flex flex-col my-20 p-8 w-full md:w-3/6 shadow-sm rounded-md mx-auto justify-center max-w-[700px]">
          <div>
            {errors && <p className="pb-8 text-red-700 text-sm">{errors}</p>}
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-8">
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
                <SelectValue placeholder="Select Member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>{" "}
                {/* Add All Members Option */}
                {members.map((member) => (
                  <SelectItem key={member.id} value={String(member.id)}>
                    {member.first_name} {member.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <div className="grid grid-cols-1  gap-3 my-6">
              <div className="flex items-center gap-x-6">
                <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
                  Contributor’s Name:
                </span>
                <span className="capitalize text-sm">
                  {messageParameters["Contributor’s Name"]}
                </span>
              </div>
              <div className="flex items-center gap-x-6">
                <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
                  Total Contribution:
                </span>
                <span className="capitalize text-sm">
                  {messageParameters["Total Contribution"]}
                </span>
              </div>
              <div className="flex items-center gap-x-6">
                <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
                  Total Dividend:
                </span>
                <span className="capitalize text-sm">
                  {messageParameters["Total Dividend"]}
                </span>
              </div>
              <div className="flex items-center gap-x-6">
                <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
                  Withdrawable Dividend:
                </span>
                <span className="capitalize text-sm">
                  {messageParameters["Withdrawable Dividend"]}
                </span>
              </div>
              <div className="flex items-center gap-x-6">
                <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
                  Month:
                </span>
                <span className="capitalize text-sm">
                  {messageParameters["Month"]}
                </span>
              </div>
              <div className="flex items-center gap-x-6">
                <span className="sm:w-40 flex-shrink-0 text-sm font-medium">
                  Year:
                </span>
                <span className="capitalize text-sm">
                  {messageParameters["Year"]}
                </span>
              </div>
            </div>
          </div>
          <Label
            htmlFor="message"
            text="Type your Message here"
            className="text-[#070606]"
          />
          <Textarea
            id="message"
            className="bg-[#F5F5F7] border-none shadow-lg w-full placeholder:text-[#5B5B5B] p-5 resize-none h-52"
            placeholder="Dear (contributor’s name), your ENDWELL balances as of (Month) (Year) are: Total Contribution = (Total Contribution); Total Dividend = (Total Dividend); Withdrawable Dividend = (Withdrawable Dividend)."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />

          <Button className="md:w-2/6 my-5" disabled={processing}>
            {processing ? "Processing..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// 'use client'
// import React, { useEffect, useState } from "react";
// import UploadFile from "../components/upload";
// import Button from "@/app/components/Button";
// import { Back } from "@/assets/icon";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import Label from "@/app/components/label";
// import { fetchMonths, fetchYears } from "../upload-ledger/action";
// import { fetchMessageParameters, sendTransactionSms } from "./action";
// import { addToast } from "@/Store/features/toastSlice";
// import handleErrors from "@/app/data/handleErrors";
// import Link from "next/link";
// import { useDispatch } from "react-redux";
// import { getAllMembers } from "@/Services/membersServie";

// export default function SendSMS() {
//   const [file, setFile] = useState(null);
//   const [years, setYears] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [messageParameters, setMessageParameters] = useState([]);
//   const [messageText, setMessageText] = useState(""); // State for Textarea value
//   const [errors, setErrors] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const [memberId] = useState(1);
//   const dispatch = useDispatch();
//   const [members, setMemberData] = useState([]);
//   const [selectedMember, setSelectedMember] = useState('');

//   useEffect(() => {
//     const loadMembers = async () => {
//       try {
//         const response = await dispatch(getAllMembers(["id", "first_name", "last_name"]))
//         console.log(response.payload);
//          setMemberData(response.payload)
//       }catch(error) {
//         handleErrors(error, setErrors("Failed to load member data."));
//       }
//     }
//     loadMembers();
//   },[dispatch])

//   useEffect(() => {
//     const loadMessageParameters = async () => {
//       try {
//         const messageData = await fetchMessageParameters();
//         setMessageParameters(messageData);
//       } catch (error) {
//         handleErrors(error, setErrors("Failed to load message parameters."));
//       }
//     };
//     loadMessageParameters();
//   }, []);

//   useEffect(() => {
//     const loadYears = async () => {
//       try {
//         const allYears = await fetchYears();
//         setYears(Object.values(allYears.months));
//       } catch (error) {
//         handleErrors(error, setErrors("The year field is required."));
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
//         handleErrors(error, setErrors("The month field is required."));
//       }
//     };
//     loadMonths();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("click");

//     if ( !selectedYear || !selectedMonth || !messageText || !selectedMember) {
//       setErrors("Please select a year, month, and enter a message.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("member_id", memberId);
//     formData.append("year", selectedYear);
//     formData.append("month", selectedMonth);
//     formData.append("message", messageText); // Add the textarea value
//     formData.append("member_id", memberId);
//     setProcessing(true);

//     try {
//       const response = await sendTransactionSms(formData);
//       setErrors("");
//       addToast({
//         type: "success",
//         message: response.message,
//       });
//     } catch (error) {
//       handleErrors(error, setErrors(error.message));

//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="md:px-6 py-10 sm:px-14 m-3">
//       <div className="flex items-center gap-8">
//         <Link href="overview" className="flex items-center gap-2 font-normal cursor-pointer">
//           <Back />
//           <p>Back</p>
//         </Link>
//         <h1 className="font-bold text-2xl">Send SMS</h1>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="bg-white flex flex-col my-20 p-8 w-full md:w-3/6 shadow-sm rounded-md mx-auto justify-center max-w-[700px]">
//         <div>{errors && <p className="pb-8 text-red-700 text-sm">{errors}</p>}</div>
//           <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-8">
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
//                 <SelectValue placeholder="Select Member" />
//               </SelectTrigger>
//               <SelectContent>
//                 {members.map((member) => (
//                   <SelectItem key={member.id} value={member.first_name}>
//                     {member.first_name} {member.last_name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <Label htmlFor="message" text="Type your Message here" className="text-[#070606]" />
//           <Textarea
//             id="message"
//             className="bg-[#F5F5F7] border-none shadow-lg w-full placeholder:text-[#5B5B5B] p-5 resize-none h-52"
//             placeholder="Dear (contributor’s name), your ENDWELL balances as of (Month) (Year) are: Total Contribution = (Total Contribution); Total Dividend = (Total Dividend); Withdrawable Dividend = (Withdrawable Dividend)."
//             value={messageText} // Bind the state
//             onChange={(e) => setMessageText(e.target.value)} // Update the state
//           />

//           <Button className="md:w-2/6 my-5" disabled={processing}>
//             {processing ? "Processing..." : "Send Message"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// 'use client';
// import React, { useEffect, useState } from "react";
// import UploadFile from "../components/upload";
// import Button from "@/app/components/Button";
// import { Back } from "@/assets/icon";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import Label from "@/app/components/label";
// import { fetchMonths, fetchYears } from "../upload-ledger/action";
// import { fetchMessageParameters, sendTransactionSms } from "./action";
// import { addToast } from "@/Store/features/toastSlice";
// import handleErrors from "@/app/data/handleErrors";
// import Link from "next/link";
// import { useDispatch } from "react-redux";
// import { getAllMembers } from "@/Services/membersServie";

// export default function SendSMS() {
//   const [file, setFile] = useState(null);
//   const [years, setYears] = useState([]);
//   const [months, setMonths] = useState([]);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [messageParameters, setMessageParameters] = useState([]);
//   const [messageText, setMessageText] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [processing, setProcessing] = useState(false);
//   const [memberId] = useState(2);
//   const dispatch = useDispatch();

//   useEffect(()=> {
//     dispatch(getAllMembers(["first_name", "last_name"]))
//   })
//   useEffect(() => {
//     const loadMessageParameters = async () => {
//       try {
//         const messageData = await fetchMessageParameters();
//         setMessageParameters(messageData);
//       } catch (error) {
//         handleErrors(error, (err) => setErrors([...errors, err]));
//       }
//     };
//     loadMessageParameters();
//   }, []);

//   useEffect(() => {
//     const loadYears = async () => {
//       try {
//         const allYears = await fetchYears();
//         setYears(Object.values(allYears.months));
//       } catch (error) {
//         handleErrors(error, (err) => setErrors([...errors, err]));
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
//         handleErrors(error, (err) => setErrors([...errors, err]));
//       }
//     };
//     loadMonths();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedYear || !selectedMonth || !messageText) {
//       setErrors(["Please fill out all required fields."]);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("member_id", memberId);
//     formData.append("year", selectedYear);
//     formData.append("month", selectedMonth);
//     formData.append("message", messageText);

//     setProcessing(true);

//     try {
//       const response = await sendTransactionSms(formData);
//       console.log(formData);

//       setErrors([]);
//       addToast({
//         type: "success",
//         message: response.message,
//       });
//     } catch (error) {
//       console.log(error);

//       handleErrors(error, (err) => setErrors([...errors, err]));
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const dynamicPlaceholder = `Dear (contributor’s name), your ENDWELL balances as of ${
//     selectedMonth || "(Month)"
//   } ${
//     selectedYear || "(Year)"
//   } are: Total Contribution = (Total Contribution); Total Dividend = (Total Dividend); Withdrawable Dividend = (Withdrawable Dividend).`;

//   return (
//     <div className="md:px-6 py-10 sm:px-14 m-3">
//       <div className="flex items-center gap-8">
//         <Link href="overview" className="flex items-center gap-2 font-normal cursor-pointer">
//           <Back />
//           <p>Back</p>
//         </Link>
//         <h1 className="font-bold text-2xl">Send SMS</h1>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="bg-white flex flex-col my-20 p-8 w-full md:w-3/6 shadow-sm rounded-md mx-auto justify-center max-w-[700px]">
//           {errors.length > 0 && (
//             <div className="text-red-700 text-sm pb-8">
//               <ul>
//                 {errors.map((err, idx) => (
//                   <li key={idx}>{err}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//           <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-8">
//             <Select onValueChange={(value) => setSelectedYear(value)}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder={selectedYear ? selectedYear : "Select Year"} />
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
//                 <SelectValue placeholder={selectedMonth ? selectedMonth : "Select Month"} />
//               </SelectTrigger>
//               <SelectContent>
//                 {months.map((month) => (
//                   <SelectItem key={month} value={month}>
//                     {month}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <Label>Enter Message</Label>
//           <Textarea
//             id="message"
//             className="h-[270px] focus:border-gray-400 focus:ring focus:ring-gray-200 outline-none text-md border-gray-300 rounded-md"
//             placeholder={dynamicPlaceholder}
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             disabled={!selectedYear || !selectedMonth}
//           />
//               <div className=" block justify-start align-top items-end justify-items-start mt-6 pb-4">
//           {/* <Select>
//             <SelectTrigger className="md:w-[200px]">
//               <SelectValue placeholder="All Members" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="2024">2024</SelectItem>
//               <SelectItem value="2024">2024</SelectItem>
//               <SelectItem value="2024">2024</SelectItem>
//             </SelectContent>
//           </Select>  */}
//         </div>
//           <Button
//             type="submit"
//             className={`md:w-2/6 my-5 ${processing ? "bg-gray-400 cursor-not-allowed" : ""}`}
//             disabled={processing}
//           >
//             {processing ? "Processing..." : "Send Message"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
