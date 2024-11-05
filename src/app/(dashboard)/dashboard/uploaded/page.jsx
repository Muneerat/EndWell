'use client'
import React from "react";
import Card from "../components/card";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import BoardFilter from "../components/board";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload2 } from "@/assets/icon";
import { UploadColumns, UploadData } from "@/app/data/UploadData";
import { UploadCloudIcon } from "lucide-react";
export default function Uploaded() {
  const UploadDatas = UploadData.map((data,index) => {
    return {
        id: index,
        name: data.name,
        number: data.number,
        asset: data.asset,
        dividend: data.dividend,
        withdrawable: data.withdrawable,
      
    };
  })
  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-5 ">
      
        <div className="flex ">
          <ButtonUpload text="Upload Ledger" icon={<Upload2/>} link="upload-ledger"/>
        </div>
      </div>
      <BoardFilter text='Uploaded file'>
      <div className="flex gap-6 ">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
       
        </div>
      </BoardFilter>
      <div>
        <DataTable data={UploadDatas} columns={UploadColumns}/>
      </div>
    </div>
  );
}
