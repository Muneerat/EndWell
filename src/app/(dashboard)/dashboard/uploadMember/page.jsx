"use client";
import React, { useState } from "react";
import axios from "axios";
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
import { useDispatch } from "react-redux";
import { addToast } from "@/Store/features/toastSlice";
import handleErrors from "@/app/data/handleErrors";

export default function UploadMember() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      dispatch(
        addToast({
          type: "error",
          message: "Please upload a valid file.",
        })
      );
      return;
    }

    // const allowedTypes = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel", "text/csv"];
    // if (!allowedTypes.includes(file.type)) {
    //   dispatch(
    //     addToast({
    //       type: "error",
    //       message: "Invalid file type. Please upload an .xlsx, .xls, or .csv file.",
    //     })
    //   );
    //   return;
    // }
    const formData = new FormData();
    formData.append("file", file);

    setProcessing(true);

    try {
      const response = await axios.post("/admin/member/bulk/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(
        addToast({
          type: "success",
          message: response.data.message,
        })
      );
    } catch (error) {
      handleErrors(error, setError);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="md:px-6 sm:px-5">
      <BoardFilter text="Members">
        <ButtonUpload text="Upload Multiple" icon={<Smile />} link="uploadMember" />
      </BoardFilter>
      <div className="bg-white flex flex-col justify-center my-20 md:p-10 p-5 w-full md:w-3/5 shadow-sm rounded-md mx-auto items-center">
     <div>{error &&  <p className="text-red-700 py-3">{error?.file} </p>  }</div>
        <UploadFile setFile={setFile} files={file} accept=".xlsx,.xls,.csv" />
        <Button
          onClick={handleSubmit}
          spin={processing}
          disabled={processing || !file}
          className="w-2/6 my-5"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
