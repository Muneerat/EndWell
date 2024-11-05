"use client";
import React, { useState } from "react";
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

export default function SendSMS() {
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

        <h1 className="font-bold text-2xl">Send SMS</h1>
      </div>
      <div className="bg-white flex flex-col my-20 p-8 w-3/6 shadow-sm rounded-md mx-auto justify-center max-w-[700px] ">
     
          <div className="flex gap-6 items-center justify-center  mb-8">
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="2024" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="September" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="september">September</SelectItem>
                <SelectItem value="dark">September</SelectItem>
                <SelectItem value="system">September</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[200px]">
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
            </Select>
          </div>
          <div className="grid w-full gap-1.5">
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
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-2/6 my-5">Send Message</Button>
        </div>
      </div>
    
  );
}
