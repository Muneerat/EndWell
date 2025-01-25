"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import TextInput from "@/app/components/TextInput";
import Button from "@/app/components/Button";
import { addToast } from "@/Store/features/toastSlice";
import { fetchMessageTemplate } from "../setting/action";
import handleErrors from "@/app/data/handleErrors";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { Back } from "@/assets/icon";

export default function TemplateStore() {
  const [messageTemplate, setMessageTemplate] = useState({
    general_message: "",
    eoyasset_message: "",
    contribution_message: "",
    dividend_message: "",
    withdrawable_dividend_message: "",
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch message Template
    const fetchMessage = async () => {
      setLoading(true);
      try {
        const response = await fetchMessageTemplate();
        setMessageTemplate(response);
      } catch {
        console.log("Failed to fetch message template");
        handleErrors(errors, setErrors("Failed to load years."));
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, []);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMessageTemplate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    try {
      const response = await axios.post(
        `/admin/message/setting/store`,
        messageTemplate,
        { headers: { Role: "admin" } }
      );

      dispatch(
        addToast({
          type: "success",
          message: response.data.message,
        })
      );
      router.push("/dashboard/setting");
    } catch (error) {
      console.log(error);

      setErrors({ submit: "Failed to update message template." });
    } finally {
      setProcessing(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto h-screen">
        <Spinner
          className="border-2 border-primary "
          size={9}
          spin={true}
        ></Spinner>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex items-center gap-8 p-5">
        <button
          onClick={() => router.push("/dashboard/setting")}
          className="flex items-center gap-2 font-normal cursor-pointer"
        >
          <Back />
          <p>Back</p>
        </button>
        <h1 className="font-bold text-2xl">Edit SMS Template</h1>
      </div>
      <form onSubmit={handleSubmit} className="m-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full bg-[#fff] md:p-5 p-5 mt-6 pb-32 rounded-md">
          <div>
            <label
              htmlFor="general_message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              General Message
            </label>
            <textarea
              id="general_message"
              name="general_message"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              placeholder="General message template"
              value={messageTemplate.general_message}
              onChange={handleChange}
              rows={4}
            />
            {errors.general_message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.general_message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="eoyasset_message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              End of Year Asset Message
            </label>
            <textarea
              id="eoyasset_message"
              name="eoyasset_message"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              placeholder="End of year asset message template"
              value={messageTemplate.eoyasset_message}
              onChange={handleChange}
              rows={4}
            />
            {errors.eoyasset_message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.eoyasset_message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="contribution_message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Contribution Message
            </label>
            <textarea
              id="contribution_message"
              name="contribution_message"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              placeholder="Contribution message template"
              value={messageTemplate.contribution_message}
              onChange={handleChange}
              rows={4}
            />
            {errors.contribution_message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contribution_message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="dividend_message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Dividend Message
            </label>
            <textarea
              id="dividend_message"
              name="dividend_message"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              placeholder="Dividend message template"
              value={messageTemplate.dividend_message}
              onChange={handleChange}
              rows={4}
            />
            {errors.dividend_message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dividend_message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="withdrawable_dividend_message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Withdrawable Dividend Message
            </label>
            <textarea
              id="withdrawable_dividend_message"
              name="withdrawable_dividend_message"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              placeholder="Withdrawable dividend message template"
              value={messageTemplate.withdrawable_dividend_message}
              onChange={handleChange}
              rows={4}
            />
            {errors.withdrawable_dividend_message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.withdrawable_dividend_message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="withdrawable_dividend_message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Price per unit
            </label>
            <textarea
              id="price_per_unit"
              name="price_per_unit"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              placeholder="price_per_uni"
              value={messageTemplate.price_per_unit}
              onChange={handleChange}
              rows={4}
            />
            {errors.price_per_unit && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price_per_unit}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="withdrawable_dividend_message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phon number
            </label>
            <textarea
              id="phone"
              name="phone"
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
              placeholder="phone number"
              value={messageTemplate.phone}
              onChange={handleChange}
              rows={4}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {errors.submit && (
          <p className="text-red-500 text-center mt-4">{errors.submit}</p>
        )}
        <div className="flex justify-center">
          <Button
            spin={processing}
            disabled={processing}
            className="w-2/5 mt-7"
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
