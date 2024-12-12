"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import handleErrors from "@/app/data/handleErrors";
import { Back } from "@/assets/icon";
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";
import { addToast } from "@/Store/features/toastSlice";
import { useDispatch } from "react-redux";
import Spinner from "@/app/components/Spinner";

export default function EditTransaction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const id = searchParams.get("id");
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const [formData, setFormData] = useState({
    total_contribution: "",
    total_dividend: "",
    withdrawable_dividend: "",
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch Transaction Details
  useEffect(() => {
    if (!id || !month || !year) {
      dispatch(
        addToast({
          type: "error",
          message: "Missing required parameters: id, month, or year.",
        })
      );
      router.push("/dashboard/transaction");
      return;
    }

    const fetchTransactionDetails = async () => {
      if (!id) {
        console.error("Missing transaction ID");
        dispatch(
          addToast({
            type: "error",
            message: "Transaction ID is missing.",
          })
        );
        router.push("/dashboard/transaction");
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get("/admin/transaction/id", {
          params: { id },
          headers: { Role: "admin" },
        });

        console.log("API Response:", response.data);

        const transaction = response.data?.data;
        if (!transaction) {
          throw new Error("Transaction not found in API response.");
        }

        setFormData({
          total_contribution: transaction.total_contribution || "",
          total_dividend: transaction.total_dividend || "",
          withdrawable_dividend: transaction.withdrawable_dividend || "",
        });
      } catch (error) {
        console.error(
          "Error fetching transaction:",
          error.response || error.message
        );
        dispatch(
          addToast({
            type: "error",
            message:
              error.response?.data?.message ||
              "Failed to fetch transaction details.",
          })
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [id, month, year, dispatch, router]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const payload = {
        id,
        contribution: parseFloat(formData.total_contribution),
        dividend: parseFloat(formData.total_dividend),
        withdrawable_dividend: parseFloat(formData.withdrawable_dividend),
      };

      const response = await axios.put(`/admin/transaction/edit`, payload, {
        headers: { Role: "admin" },
      });

      dispatch(
        addToast({
          type: "success",
          message: response.data.message || "Transaction updated successfully!",
        })
      );
      router.push("/dashboard/transaction");
    } catch (error) {
      console.log(
        "Failed to update transaction:",
        error.response || error.message
      );
      handleErrors(error, setErrors);
      dispatch(
        addToast({
          type: "error",
          message:
            error.response?.data?.message || "Failed to update transaction.",
        })
      );
    } finally {
      setProcessing(false);
    }
  };

  if (loading){
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        aria-live="polite"
        aria-busy="true"
      >
        <Spinner className="border-2 border-primary" size={9} spin={true} />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
   
  return (
    <div className="md:px-6 pt-4 sm:px-14 m-3">
      <div className="flex items-center gap-8">
        <button
          onClick={() => router.push("/dashboard/transaction")}
          className="flex items-center gap-2 font-normal cursor-pointer"
        >
          <Back />
          <p>Back</p>
        </button>
        <h1 className="font-bold text-2xl">Edit Transaction</h1>
      </div>
      <div className="bg-white flex flex-col my-20 p-8 w-full shadow-sm rounded-md max-w-[1050px]">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full bg-[#fff] md:p-5 mt-6 pb-32 rounded-md">
            <TextInput
              label="Total Contribution"
              id="total_contribution"
              name="total_contribution"
              placeholder="Enter the total contribution"
              type="number"
              value={formData.total_contribution}
              onChange={handleChange}
              errorMessage={errors?.total_contribution}
            />
            <TextInput
              label="Total Dividend"
              id="total_dividend"
              name="total_dividend"
              placeholder="Enter the total dividend"
              type="text"
              value={formData.total_dividend}
              onChange={handleChange}
              errorMessage={errors?.total_dividend}
            />
            <TextInput
              label="Withdrawable Dividend"
              id="withdrawable_dividend"
              name="withdrawable_dividend"
              placeholder="Enter the withdrawable dividend"
              type="text"
              value={formData.withdrawable_dividend}
              onChange={handleChange}
              errorMessage={errors?.withdrawable_dividend}
            />
          </div>
          <Button
            spin={processing}
            disabled={processing}
            className="w-3/6 mt-7"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}

// 'use client'
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import handleErrors from "@/app/data/handleErrors";
// import { Back } from "@/assets/icon";
// import TextInput from "@/app/components/TextInput";
// import Button from "@/app/components/Button";
// import { addToast } from "@/Store/features/toastSlice";
// import { useDispatch } from "react-redux";

// export default function EditTransaction() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   // const id = searchParams.get("id");
//     const id = searchParams.get("id");
//   const month = searchParams.get("month");
//   const year = searchParams.get("year");
//   console.log(id,month,year);
//   const [formData, setFormData] = useState({
//     amount: "",
//     description: "",
//     date: "",
//     status: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [processing, setProcessing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//       console.log('clicking transaction',id);
//       console.log('here is transaction ');

//           // const fetchTransactionDetails = async () => {
//           //   if (!id || !month || !year) {
//           //     // setError("Missing required parameters: id, month, or year.");
//           //     return;
//           //   }
//     if (id) {
//       const fetchTransaction = async () => {
//         setLoading(true);

//         try {
//           const response = await axios.get(`/transaction/history/${id}`, {
//             headers: { Role: 'admin' },
//             params: { id,month, year, },
//           });
//           const transaction = response.data.transactions;
//           console.log(response);

//           setFormData({
//             total_contribution: transaction.total_contribution,
//             total_dividend: transaction.total_dividend,
//             withdrawable_dividend: transaction.withdrawable_dividend,
//           });
//         } catch (error) {
//           console.log("Failed to fetch transaction:", error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchTransaction();
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     try {
//       const response = await axios.put(`/admin/transaction/edit`, {
//         ...formData,
//         id,
//       }, { headers: { Role: 'admin' } });
//       dispatch(
//         addToast({
//           type: "success",
//           message: response.data.message,
//         })
//       );
//       router.push("/dashboard/transaction");
//     } catch (error) {
//       console.log("Failed to update transaction:", error);
//       handleErrors(error, setErrors);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="md:px-6 pt-4 sm:px-14 m-3">
//       <div className="flex items-center gap-8">
//         <button
//           onClick={() => router.push("/dashboard/transaction")}
//           className="flex items-center gap-2 font-normal cursor-pointer"
//         >
//           <Back />
//           <p>Back</p>
//         </button>
//         <h1 className="font-bold text-2xl">Edit Transaction</h1>
//       </div>
//       <div className="bg-white flex flex-col my-20 p-8 w-full shadow-sm rounded-md max-w-[1050px]">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full bg-[#fff] md:p-5 mt-6 pb-32 rounded-md">
//             <TextInput
//               label="Total contribution"
//               id="total_contribution"
//               name="total_contribution"
//               placeholder="Enter the total contribution"
//               type="number"
//               value={formData.total_contribution}
//               onChange={handleChange}
//               errorMessage={errors?.total_contribution}
//             />
//             <TextInput
//               label="Total dividend"
//               id="total_dividend"
//               name="total_dividend"
//               placeholder="Enter the total dividend"
//               type="text"
//               value={formData.total_dividend}
//               onChange={handleChange}
//               errorMessage={errors?.total_dividend}
//             />
//             <TextInput
//               label="Withdrawable dividend"
//               id="withdrawable_dividend"
//               name="withdrawable_dividend"
//               placeholder="Enter the withdrawable dividend"
//               type="text"
//               value={formData.withdrawable_dividend}
//               onChange={handleChange}
//               errorMessage={errors?.withdrawable_dividend}
//             />
//           </div>
//           <Button spin={processing} disabled={processing} className="w-3/6 mt-7">
//             Update
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }
// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSearchParams, useRouter } from "next/navigation";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import Spinner from "@/app/components/Spinner";

// export default function TransactionEditPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [transaction, setTransaction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     total_contribution: "",
//     total_dividend: "",
//     withdrawable_dividend: "",
//   });

//   const id = searchParams.get("id");
//   const month = searchParams.get("month");
//   const year = searchParams.get("year");
//   console.log(id,month,year);

//   // Fetch Transaction Data
//   useEffect(() => {
//     console.log('here is transaction ');

//     const fetchTransactionDetails = async () => {
//       if (!id || !month || !year) {
//         setError("Missing required parameters: id, month, or year.");
//         return;
//       }

//       setLoading(true);
//       try {
//         const response = await axios.get(`/transaction/${id}`, {
//           headers: { Role: "admin" },
//           params: { month, year },
//         });
//         setTransaction(response.data.transaction);
//         setFormData({
//           total_contribution: response.data.transaction.total_contribution,
//           total_dividend: response.data.transaction.total_dividend,
//           withdrawable_dividend: response.data.transaction.withdrawable_dividend,
//         });
//         setError(null);
//       } catch (err) {
//         setError(err.response?.data?.message || "Failed to fetch transaction.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactionDetails();
//   }, [id, month, year]);

//   // Handle Input Changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Update Transaction
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     try {
//       await axios.put(`/transaction/${id}`, formData, {
//         headers: { Role: "admin" },
//       });
//       alert("Transaction updated successfully!");
//       router.push("/dashboard/transactions"); // Redirect to transactions list
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to update transaction.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 shadow-md bg-white rounded-md">
//       <h1 className="text-xl font-semibold mb-4">Edit Transaction</h1>
//       {loading && (
//         <div className="flex justify-center">
//           <Spinner size={6} />
//         </div>
//       )}
//       {error && <p className="text-red-600 mb-4">{error}</p>}
//       {transaction && (
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="total_contribution" className="block text-sm font-medium">
//               Total Contribution
//             </label>
//             <Input
//               id="total_contribution"
//               name="total_contribution"
//               value={formData.total_contribution}
//               onChange={handleInputChange}
//               type="number"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="total_dividend" className="block text-sm font-medium">
//               Total Dividend
//             </label>
//             <Input
//               id="total_dividend"
//               name="total_dividend"
//               value={formData.total_dividend}
//               onChange={handleInputChange}
//               type="number"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="withdrawable_dividend" className="block text-sm font-medium">
//               Withdrawable Dividend
//             </label>
//             <Input
//               id="withdrawable_dividend"
//               name="withdrawable_dividend"
//               value={formData.withdrawable_dividend}
//               onChange={handleInputChange}
//               type="number"
//               required
//             />
//           </div>
//           <div className="flex justify-end">
//             <Button type="submit" className="w-full">
//               Update Transaction
//             </Button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }
