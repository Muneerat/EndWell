'use client'
import React, { useState } from "react";
import ButtonUpload from "../../dashboard/components/button";
import { DataTable } from "../../dashboard/components/table";
import { UpArrow,} from "@/assets/icon";
import BoardFilter from "../../dashboard/components/board";
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
    
      <BoardFilter text='Your Requests'>
      <ButtonUpload text="Request Report" icon={<UpArrow/>}  link="requestSms"/>
      </BoardFilter>
      <div>
        <DataTable data={OverviewDatas} columns={OverviewColumns}/>
      </div>
    </div>
  );
}
