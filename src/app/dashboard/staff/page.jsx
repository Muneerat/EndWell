import React from "react";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";

export default function Staff() {
  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-10 ">
      
        <div className="flex">
          <ButtonUpload text="Add new staff" icon=""/>
        </div>
      </div>
      <div>
        <DataTable/>
      </div>
    </div>
  );
}
