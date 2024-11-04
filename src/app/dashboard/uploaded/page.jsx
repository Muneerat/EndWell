
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
export default function Uploaded() {
  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-5 ">
      
        <div className="flex ">
          <ButtonUpload text="Upload Ledger" icon={<Upload2/>}/>
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
        <DataTable/>
      </div>
    </div>
  );
}
