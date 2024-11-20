"use client";
import React, { useState } from "react";
import axios from "axios";
import UploadFile from "../components/upload";
import Button from "@/app/components/Button";
import { Smile } from "@/assets/icon";
import BoardFilter from "../components/board";
import ButtonUpload from "../components/button";
import { useDispatch } from "react-redux";
import { addToast } from "@/Store/features/toastSlice";

export default function UploadMember() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

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

    const formData = new FormData();
    formData.append("file", file[0]); 

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
          message: response.data.message || "File uploaded successfully!",
        })
      );
      setStatus("File uploaded successfully!");
    } catch (error) {
      dispatch(
        addToast({
          type: "error",
          message: "Error uploading file.",
        })
      );
      setStatus("Error uploading file.");
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
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <UploadFile
            setFile={setFile}
            files={file}
            accept=".xls,.xlsx,.csv"
            className="w-full"
          />
          <Button
            spin={processing}
            disabled={processing || !file}
            className="w-2/6 my-5"
          >
            Save
          </Button>
        </form>
        {status && <p className="text-center mt-4">{status}</p>}
      </div>
    </div>
  );
}
