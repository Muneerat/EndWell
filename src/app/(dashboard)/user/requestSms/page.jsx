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
import { fetchMonths, fetchRequestTypes, fetchYears } from "./action";

export default function RequestSms() {
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [requestTypes, setRequestType] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedRequestType, setSelectedRequestType] = useState("");

  useEffect(() => {
    const loadRequestType = async () => {
      try {
        const allRequestType = await fetchRequestTypes();
        console.log(allRequestType);

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
      <div className="bg-white flex flex-col justify-center my-20 md:p-10 p-5 w-full md:w-2/5 shadow-sm rounded-md mx-auto items-center">
        <div className="flex flex-col gap-6 mb-12 w-full md:w-4/5">
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
          </div>
          <div>
            <TextInput
              className="w-full block border-[#BFBFBF] text-[#3E3E3E]"
              label="Phone number"
              id="email"
              maxLength="255"
              placeholder="081234567892"
              type="text"
            />
          </div>
          <div>
            <label className="py-2">Request type</label>
            {/* <Select onValueChange={(value) => setSelectedRequestType(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={selectedMonth || "Request type"} />
                </SelectTrigger>
                <SelectContent>
                  {requestTypes.map((requestType,index) => (
                    <SelectItem key={requestTypes} value={requestTypes}>
                      {requestType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}
            <SelectContent>
              {requestTypes.map((requestType) => (
                <SelectItem key={requestType} value={requestType}>
                  {requestType}
                </SelectItem>
              ))}
            </SelectContent>
          </div>

          <Button className="w- my-5">Send request</Button>
        </div>
      </div>
    </div>
  );
}
