'use client'
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getAllMembers } from "@/Services/membersServie";

export default function Overview() {
   const totalLedgers = useSelector((state) => state.ledger.totalLedgers)
   const totalMembers = useSelector((state) => state.member.totalMembers)
   const {members} = useSelector((state) => state.member )
  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMembers())
  },[dispatch]);


  return (
    <div className="">
      <div className="flex md:flex-row flex-col justify-between w-full px-6 pt-7 pb-1 flex-reverse flex-shrink ">
        <div className="grid lg:grid-cols-3  md:grid-cols-2  grid-cols-1 my-2  gap-8 text-primary ">
          <Card text='No. of Members' number={totalMembers} />
          <Card text='No. of ledger uploaded' number={totalLedgers} />
          <Card text='No. of  sent' number="0" />
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
        <DataTable data={members} columns={OverviewColumns}/>
      </div>
    </div>
  );
}
