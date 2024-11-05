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
    <div className="px- py-5">
      <BoardFilter text='Members'>
          <ButtonUpload text="Upload Multiple" icon={<Smile/>} link='uploadMember'/>
      </BoardFilter>
      <div className="bg-white flex flex-col justify-center my-20 p-10 w-3/5 shadow-sm rounded-md mx-auto items-center">

        <UploadFile setFile={setFile} files={file} accept="audio/*,image/*" />
        <Button className="w-2/6 my-5">Save</Button>
      </div>
    </div>
  );
}
