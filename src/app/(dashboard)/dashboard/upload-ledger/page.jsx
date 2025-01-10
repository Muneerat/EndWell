"use client";
import React, { useEffect, useState } from "react";
import UploadFile from "../components/upload";
import Button from "@/app/components/Button";
import { Back } from "@/assets/icon";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { fetchMonths, fetchYears, uploadLedger } from "./action";
import handleErrors from "@/app/data/handleErrors";
import { useDispatch } from "react-redux";
import { addToast } from "@/Store/features/toastSlice";
import { useRouter } from "next/navigation";
import Dropdown from "../components/dropdown";

export default function UploadLedger() {
  const [file, setFile] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  // const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  //fetch loads years
  useEffect(() => {
    const loadYears = async () => {
      try {
        const allYears = await fetchYears();
        const yearArray = Object.values(allYears.months);
        setYears(yearArray);
      } catch (error) {
        handleErrors(error, setErrors("The year field is required."));
      }
    };
    loadYears();
  }, []);

  useEffect(() => {
    // if(selectedYear){
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
        handleErrors(error, setErrors("The month field is required."));
      }
    };
    loadMonths();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !selectedYear || !selectedMonth) {
      setErrors("Please select a year, month, and file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("year", selectedYear);
    formData.append("month", selectedMonth);

    setProcessing(true);

    try {
      const response = await uploadLedger(formData);
      setErrors("");

      dispatch(
        addToast({
          type: "success",
          message: response.message,
        })
      );
      router.push("/dashboard/uploaded");
    } catch (error) {
      handleErrors(
        error,
        setErrors(error.message)
      );
    
      
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="md:px-6 py-10 sm:px-14 m-3">
      <div className="flex items-center gap-8">
        <Link
          href="uploaded"
          className="flex items-center gap-2 font-normal  cursor-pointer "
        >
          <Back />
          <p>Back</p>
        </Link>

        <h1 className="font-bold text-2xl">Upload Ledger</h1>
      </div>
      <div className="my-10 mx-5 flex justify-end gap-4">
      <h1 className="font-bold text-2xl ">Contribution upload sample</h1>
      <a href="https://endwellapp.electroniccollectionsecg.com/sample/contribution_sample.xlsx">
             <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-primary hover:text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
              />
            </svg>
          </a>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white flex flex-col justify-center my-5 md:my-20 md:p-10 p-5 w-full lg:w-3/5 shadow-sm rounded-md mx-auto items-center">
          <div>
            {errors && <p className="pb-8 text-red-700 text-sm">{errors}</p>}
          </div>

          <div className="flex gap-6 mb-16">
            <Select onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={selectedYear || "Select Year"} />
              </SelectTrigger>
              <SelectContent className="overflow-y-auto h-60">
                {years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}

              </SelectContent>
            </Select>
            <Dropdown
              options={months.map((month) => ({
                label: month.key,
                value: month.value,
              }))}
              onValueChange={(value) => setSelectedMonth(value)}
              placeholder={selectedMonth || "Select Month"}
            />
            {/* <Select onValueChange={(value) => setSelectedMonth(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={selectedMonth || "Select Month"} />
              </SelectTrigger>
              <SelectContent className="overflow-y-auto h-60">
                {months.map((month) => (
                  <SelectItem key={month.value} value={String(month.value)}>
                    {month.key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </div>
          <UploadFile setFile={setFile} files={file} accept=".xls,.xlsx" />
          <Button
            spin={processing}
            disabled={processing || !file}
            className="w-2/6 my-5"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
