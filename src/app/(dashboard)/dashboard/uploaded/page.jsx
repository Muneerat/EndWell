'use client'
import React, {useState, useEffect } from "react";
import Card from "../components/card";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import BoardFilter from "../components/board";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload2 } from "@/assets/icon";
import { UploadColumns, UploadData } from "@/app/data/UploadData";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLedgers } from "@/Store/features/ledgerSlice";
import Spinner from "@/app/components/Spinner";
export default function Uploaded() {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadData, setUploadData] = useState([]);
  const dispatch = useDispatch();

//fetch all ledger files
useEffect(()=> {
  const ledgerFiles = async () => {
    setProcessing(true)
    try{
      const response = await axios.get("/admin/ledger/all");
      const data = await response.data.ledgers;
      const ledgers = data.map((ledger,index) => ({
        ID: index + 1,
        id: ledger.id,
        fileName: ledger.file_name,
        fileType: ledger.file_type,
        dateUploaded: ledger.date,
        status: ledger.status,
        uploaded_by: ledger.uploaded_by,
      }))
      setUploadData(ledgers);

      dispatch(setLedgers(ledgers))
      return response.data.ledger
    }catch(error){
      console.log("Failed to fetch ledger files", error);
    }finally{
      setProcessing(false)
    }
  }
  ledgerFiles();
},[])

  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-5 ">
      
        <div className="flex ">
          <ButtonUpload text="Upload Ledger" icon={<Upload2/>} link="upload-ledger"/>
        </div>
      </div>
      <BoardFilter text='Uploaded file'>
      <div className="flex gap-6 ">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
       
        </div>
      </BoardFilter>
      <div>
      {processing ? (
          <div className="flex justify-center items-center mt-32">
            <Spinner
              spin={processing}
              className="border-2 border-primary "
              size={9}
            />
          </div>
        ) : (
        <DataTable data={uploadData} columns={UploadColumns}/>
        )}
      </div>
    </div>
  );
}
