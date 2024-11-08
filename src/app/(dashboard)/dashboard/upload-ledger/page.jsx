"use client";
import React, { useState } from "react";
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
} from "@/components/ui/select";

export default function UploadLedger() {
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

        <h1 className="font-bold text-2xl">Upload Ledger</h1>
      </div>
      <div className="bg-white flex flex-col justify-center my-20 p-10 w-3/5 shadow-sm rounded-md mx-auto items-center">
        <div className="flex gap-6 mb-16">
          <Select>
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="2024" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="September" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="september">September</SelectItem>
              <SelectItem value="dark">September</SelectItem>
              <SelectItem value="system">September</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Xlsx" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Xlsx</SelectItem>
              <SelectItem value="dark">Xlsx</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <UploadFile setFile={setFile} files={file} accept="audio/*,image/*" />
        <Button className="w-2/6 my-5">Save</Button>
      </div>
    </div>
  );
}
