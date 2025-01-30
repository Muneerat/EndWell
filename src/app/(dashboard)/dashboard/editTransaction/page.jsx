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

        const transaction = response.data?.data;
        if (!transaction) {
          throw new Error("Transaction not found in API response.");
        }

        setFormData({
          total_contribution: transaction.total_contribution,
          total_dividend: transaction.total_dividend || "",
          withdrawable_dividend: transaction.withdrawable_dividend || "",
        });
      } catch (error) {
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

  if (loading) {
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
              type="text"
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
