import React from "react";
import Card from "../components/card";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import { Sms, Upload2 } from "@/assets/icon";
import BoardFilter from "../components/board";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Overview() {
  return (
    <div className="">
      <div className="flex md:flex-row flex-col justify-between w-full px-6 py-10 flex-reverse flex-shrink ">
        <div className="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-8 text-primary ">
          <Card text='No. of Members' number="108" />
          <Card text='No. of ledger uploaded' number="10" />
          <Card text='No. of  sent' number="15" />
        </div>
        <div className="flex  justify-start justify- gap-2">
          <ButtonUpload text="Upload Ledger" icon={<Upload2/>} link="upload-ledger"/>
          <ButtonUpload text="Send SMS" icon={<Sms/>}  link="SendSMS"/>
        </div>
      </div>
      <BoardFilter text='Members'>
      <div className="flex gap-6 ">
          <Select>
            <SelectTrigger className="w-[180px]">
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
      </BoardFilter>
      <div>
        <DataTable/>
      </div>
    </div>
  );
}
