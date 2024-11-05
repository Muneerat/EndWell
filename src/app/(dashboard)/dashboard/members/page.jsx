'use client'
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import { Smile, Upload2 } from "@/assets/icon";
import BoardFilter from "../components/board";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StaffColumns, StaffData } from "@/app/data/staffData";

export default function Staff() {
  const StaffDatas = StaffData.map((data,index) => {
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
    <div className="my-5">
      <BoardFilter text='Members'>
          <ButtonUpload text="Add members" icon={<Smile/>}/>
      </BoardFilter>
      <div>
        <DataTable data={StaffDatas} columns={StaffColumns}/>
      </div>
    </div>
  );
}
