import React from "react";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import { Upload2 } from "@/assets/icon";
import BoardFilter from "../components/board";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Staff() {
  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-5 ">
      
        <div className="flex">
          <ButtonUpload text="Add new staff" icon={<Upload2/>}/>
        </div>
      </div>
      <BoardFilter text='Staff'>
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
