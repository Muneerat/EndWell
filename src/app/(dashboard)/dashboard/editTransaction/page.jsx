'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import handleErrors from "@/app/data/handleErrors";
import { Back } from "@/assets/icon";
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";
import { addToast } from "@/Store/features/toastSlice";
import { useDispatch } from "react-redux";

export default function EditTransaction() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    status: "",
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
      console.log('clicking transaction',id);
    if (id) {
      const fetchTransaction = async () => {
        setLoading(true);
        
        try {
          const response = await axios.get(`/transaction/history`, {
            headers: { Role: 'admin' },
            params: { id,month, year, },
          });
          const transaction = response.data.transactions;
          console.log(response);
          
          setFormData({
            total_contribution: transaction.total_contribution,
            total_dividend: transaction.total_dividend,
            withdrawable_dividend: transaction.withdrawable_dividend,
          });
        } catch (error) {
          console.log("Failed to fetch transaction:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchTransaction();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const response = await axios.put(`/admin/transaction/edit`, {
        ...formData,
        id,
      }, { headers: { Role: 'admin' } });
      dispatch(
        addToast({
          type: "success",
          message: response.data.message,
        })
      );
      router.push("/dashboard/transaction");
    } catch (error) {
      console.log("Failed to update transaction:", error);
      handleErrors(error, setErrors);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <p>Loading...</p>;

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
              label="Total contribution"
              id="total_contribution"
              name="total_contribution"
              placeholder="Enter the total contribution"
              type="number"
              value={formData.total_contribution}
              onChange={handleChange}
              errorMessage={errors?.total_contribution}
            />
            <TextInput
              label="Total dividend"
              id="total_dividend"
              name="total_dividend"
              placeholder="Enter the total dividend"
              type="text"
              value={formData.total_dividend}
              onChange={handleChange}
              errorMessage={errors?.total_dividend}
            />
            <TextInput
              label="Withdrawable dividend"
              id="withdrawable_dividend"
              name="withdrawable_dividend"
              placeholder="Enter the withdrawable dividend"
              type="text"
              value={formData.withdrawable_dividend}
              onChange={handleChange}
              errorMessage={errors?.withdrawable_dividend}
            />
          </div>
          <Button spin={processing} disabled={processing} className="w-3/6 mt-7">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
