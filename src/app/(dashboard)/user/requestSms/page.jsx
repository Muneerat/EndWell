"use client";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import { Back } from "@/assets/icon";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TextInput from "@/app/components/TextInput";
import {
  fetchMonths,
  fetchRequest,
  fetchRequestTypes,
  fetchYears,
} from "./action";
import { addToast } from "@/Store/features/toastSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import handleErrors from "@/app/data/handleErrors";
export default function RequestSms() {
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [requestTypes, setRequestType] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedRequestType, setSelectedRequestType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const loadRequestType = async () => {
      try {
        const allRequestType = await fetchRequestTypes();
        const requestTypeArray = Object.values(allRequestType); // Extract values as an array
      console.log(requestTypeArray)
        console.log(typeof requestTypeArray);
        // console.log(allRequestType.months);
        console.log(allRequestType, typeof allRequestType, Array.isArray(allRequestType));

        
        setRequestType(allRequestType);
      } catch (error) {
        setErrors("Failed to load years.");
      }
    };
    loadRequestType();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedYear || !selectedMonth || !selectedRequestType || !phoneNumber) {
      console.log("All fields are required.");
      setErrors("All fields are required.");
      return;
    }
    const formData = new FormData();
    formData.append("year", selectedYear);
    formData.append("month", selectedMonth);

    // Prepare data
    const requestData = {
      year: selectedYear,
      month: selectedMonth,
      phoneNumber,
      requestType: selectedRequestType,
    };

    try {
      console.log("click",requestData);

      setLoading(true);
      setErrors(null);
      const response = await fetchRequest(requestData);
      setErrors("");
      console.log(response);
      dispatch(
        addToast({
          type: "success",
          message: "SMS request submitted successfully",
        })
      );
      // routerpush("");
    } catch (error) {
      console.log(error);

      handleErrors(error, setErrors(error.message));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-6 py-10">
      <div className="flex items-center gap-8">
        <Link
          href="overview"
          className="flex items-center gap-2 font-normal  cursor-pointer "
        >
          <Back />
          <p>Back</p>
        </Link>

        <h1 className="font-bold text-2xl">Make sms request </h1>
      </div>
      <div className="bg-white flex flex-col justify-center my-20 md:p-10 p-5 w-full md:w-2/5 shadow-md rounded-md mx-auto items-center">
        <div className="flex flex-col gap-6 mb-12 w-full md:w-4/5">
          <div>
            {error && <p className="pb-8 text-red-700 text-sm">{error}</p>}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-6 mb-5">
              <Select onValueChange={(value) => setSelectedYear(value)}>
                <SelectTrigger className="w-full">
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
                <SelectTrigger className="w-full">
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
            <div className="my-5">
            <TextInput
                className="w-full block border-primary border-2 text-[#3E3E3E]"
                label="Phone number"
                id="number"
                maxLength="255"
                placeholder="081234567892"
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              {/* <label className="py-2">Request type</label>
            <Select onValueChange={(value) => setSelectedRequestType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={selectedRequestType || "Request type"} />
                </SelectTrigger>
                <SelectContent>
                  {requestTypes.map((requestType) => (
                    <SelectItem key={requestType} value={requestType}>
                      {requestType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
              <Select onValueChange={(value) => setSelectedRequestType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={selectedRequestType || "Request type"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {requestTypes.map((requestType,index) => (
                    <SelectItem key={index} value={requestType}>
                      {requestType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center">
              <Button spin={loading} disabled={loading} className="w-3/6 my-5 ">
                Send request
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
