import React from "react";
import Card from "../components/card";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";

export default function SMS() {
  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-10 ">
      
        <div className="flex ">
          <ButtonUpload text="Send SMS" icon=""/>
        </div>
      </div>
      <div>
        <DataTable/>
      </div>
    </div>
  );
}
