"use client";
import React, { useState } from "react";
import UploadFile from "../components/upload";
import Button from "@/app/components/Button";
import { Back, Smile } from "@/assets/icon";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BoardFilter from "../components/board";
import ButtonUpload from "../components/button";

export default function UploadMember() {
  const [file, setFile] = useState(null);
  return (
    <div className=" md:px-6  sm:px-5 ">
      <BoardFilter text='Members'>
          <ButtonUpload text="Upload Multiple" icon={<Smile/>} link='uploadMember'/>
      </BoardFilter>
      <div className="bg-white flex flex-col justify-center my-20 md:p-10 p-5 w-full md:w-3/5 shadow-sm rounded-md mx-auto items-center">

        <UploadFile setFile={setFile} files={file} accept=".xls,.xlsx" />
        <Button className="w-2/6 my-5">Save</Button>
      </div>
    </div>
  );
}
