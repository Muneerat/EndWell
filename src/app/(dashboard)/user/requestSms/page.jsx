
"use client";
import React, { useState } from "react";
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

export default function RequestSms() {
  const [file, setFile] = useState(null);
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
          <Select className=''>
            <SelectTrigger className="w-full border-[#BFBFBF]">
              <SelectValue placeholder="Select" className="placeholder:text-[#A6A6A6]" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contribution">Total Contribution</SelectItem>
              <SelectItem value="dividend">Total Dividend</SelectItem>
              <SelectItem value="withdrawable">Withdrawable Dividend</SelectItem>
              <SelectItem value="2024">Transaction History</SelectItem>
            </SelectContent>
          </Select>
          </div>
        
        <Button className="w- my-5">Send request</Button>
        </div>
     
      </div>
    </div>
  );
}
