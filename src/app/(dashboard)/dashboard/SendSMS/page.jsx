"use client";
import React, { useEffect, useState } from "react";
import UploadFile from "../components/upload";
import Button from "@/app/components/Button";
import { Back } from "@/assets/icon";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
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
import { LogInIcon } from "lucide-react";
import { fetchMessageParameters } from "./action";

export default function SendSMS() {
  const [file, setFile] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [messageParameters, setMessageParameters] = useState([]);

  useEffect(() => {
    const loadMessageParameters = async () => {
      try {
        const messageData = await fetchMessageParameters();
        // const monthsArray = Object.keys(monthData.months);
        setMessageParameters(messageData);
        console.log(messageData);
      } catch (error) {
        handleErrors(error, setErrors("The month field is required."));
      }
    };
    loadMessageParameters();
  }, []);

  useEffect(() => {
    const loadYears = async () => {
      try {
        const allYears = await fetchYears();
        const yearArray = Object.values(allYears.months);
        setYears(yearArray);
      } catch {
        handleErrors(error, setErrors("The year field is required."));
      }
    };
    loadYears();
  }, []);
  useEffect(() => {
    const loadMonths = async () => {
      try {
        const monthData = await fetchMonths();
        const monthsArray = Object.keys(monthData.months);
        setMonths(monthsArray);
      } catch (error) {
        handleErrors(error, setErrors("The month field is required."));
      }
    };
    loadMonths();
  }, []);
  return (
    <div className="md:px-6 py-10 sm:px-14 m-3">
      <div className="flex items-center gap-8">
        <Link
          href="overview"
          className="flex items-center gap-2 font-normal  cursor-pointer "
        >
          <Back />
          <p>Back</p>
        </Link>

        <h1 className="font-bold text-2xl">Send SMS</h1>
      </div>
      <div className="bg-white flex flex-col my-20 p-8 w-full md:w-3/6 shadow-sm rounded-md mx-auto justify-center max-w-[700px] ">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center  mb-8">
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
              <SelectValue placeholder={selectedMonth || "Select months"} />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* <Select>
              <SelectTrigger className="md:w-[200px]">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <Checkbox id="terms1" />
                  Select report type
                </SelectItem>
                <SelectItem value="dark">Xlsx</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select> */}
        </div>
        <div className="grid w-full gap-1.5">
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
            placeholder="Dear (contributor’s name), your ENDWELL balances as of (Month) are: Total Contribution =Nxxx,xxx.xx) ;  Total Dividend = Nxxx,xxx.xx) and Withdrawable Dividend = Nxxx,xxx.xx)."
            id="message"
            className="bg-[#F5F5F7] border-none shadow-lg w-full placeholder:text-[#5B5B5B] p-5 resize-none h-52"
          />
        </div>
        <div className=" block justify-start align-top items-end justify-items-start mt-6 pb-4">
          <Select>
            <SelectTrigger className="md:w-[200px]">
              <SelectValue placeholder="All Members" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="md:w-2/6 my-5">Send Message</Button>
      </div>
    </div>
  );
}
