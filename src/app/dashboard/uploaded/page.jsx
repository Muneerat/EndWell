
import React from "react";
import Card from "../components/card";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";

export default function Uploaded() {
  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-10 ">
      
        <div className="flex ">
          <ButtonUpload text="Upload Ledger" icon=""/>
        </div>
      </div>
      <div>
        <DataTable/>
      </div>
    </div>
  );
}
