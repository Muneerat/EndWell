import React from "react";
import Card from "../components/card";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import { Sms } from "@/assets/icon";
import BoardFilter from "../components/board";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SMS() {
  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-5 ">
      
        <div className="flex ">
          <ButtonUpload text="Send SMS" icon={<Sms/>}/>
        </div>
      </div>
      <BoardFilter text='Messages'>
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
     
        </div>
      </BoardFilter>
      <div>
        <DataTable/>
      </div>
    </div>
  );
}
