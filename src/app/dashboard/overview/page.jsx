import React from "react";
import Card from "../components/card";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";

export default function Overview() {
  return (
    <div className="">
      <div className="flex justify-between w-full px-6 py-10 ">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 text-primary ">
          <Card text='No. of Members' number="108" />
          <Card text='No. of ledger uploaded' number="10" />
          <Card text='No. of  sent' number="15" />
        </div>
        <div className="flex justify-start justify- gap-4">
          <ButtonUpload text="Upload Ledger" icon=""/>
          <ButtonUpload text="Send SMS" icon=""/>
        </div>
      </div>
      <div>
        <DataTable/>
      </div>
    </div>
  );
}
