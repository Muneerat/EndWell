'use client'
import React, { useState } from "react";
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
import { OverviewColumns, OverviewData } from "@/app/data/overviewData";

export default function Overview() {
  // const [overviewData, setOverviewData] = useState();
  const [filter, setFilter] = useState('');
  const OverviewDatas = OverviewData.map((data,index) => {
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
      <div className="flex md:flex-row flex-col justify-between w-full px-6 pt-7 pb-1 flex-reverse flex-shrink ">
        <div className="grid lg:grid-cols-3  grid-cols-1 my-2  gap-8 text-primary ">
          <Card text='No. of Members' number="108" />
          <Card text='No. of ledger uploaded' number="10" />
          <Card text='No. of  sent' number="15" />
        </div>
        <div className="flex  justify-start justify- gap-2 ">
          <ButtonUpload text="Upload Ledger" icon={<Upload2/>} link="upload-ledger"/>
          <ButtonUpload text="Send SMS" icon={<Sms/>}  link="SendSMS"/>
        </div>
      </div>
      <BoardFilter text='Members'>
      <div className="flex flex-row gap-1 md:gap-6 ">
          <Select>
            <SelectTrigger className="md:w-[180px] ">
              <SelectValue placeholder="2024" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="md:w-[180px] ">
              <SelectValue placeholder="September" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="september">September</SelectItem>
              <SelectItem value="dark">September</SelectItem>
              <SelectItem value="system">September</SelectItem>
            </SelectContent>
          </Select>
        
        </div>
      </BoardFilter>
      <div>
        <DataTable data={OverviewDatas} columns={OverviewColumns}/>
      </div>
    </div>
  );
}
