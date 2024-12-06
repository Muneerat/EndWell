"use client";
import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setLedgers } from "@/Store/features/ledgerSlice";
import Spinner from "@/app/components/Spinner";
import { getAllLedger } from "@/Services/ledgerService";

export default function MemberRequest() {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadData, setUploadData] = useState([]);
  const dispatch = useDispatch();
  const { ledgers, totalLedgers, loading, error } = useSelector(
    (state) => state.ledger
  );

  //fetch all ledger files
  useEffect(() => {
    const fetchTransactionRequest = async () => {
      setProcessing(true)
      try{
        const response = await axios.get("/transaction-request",{ headers: {Role: 'admin'},});
        const data = await response.data.member_requests;
        console.log(data);
        
        // const memberRequests = data.map((ledger,index) => ({
        //   ID: index + 1,
        //   id: ledger.id,
        //   member_name: ledger.member_name,
        //   month: ledger.month,
        //   dateUploaded: ledger.phone,
        //   status: ledger.request_date,
        //   uploaded_by: ledger.request_type,
         //   status: ledger.status,
        //   uploaded_by: ledger.year,
        // }))
        // setUploadData(ledgers);

        // dispatch(setLedgers(ledgers))
        return response.data.member_requests
      }catch(error){
        console.log("Failed to fetch ledger files", error);
      }finally{
        setProcessing(false)
      }
    }
    fetchTransactionRequest();
  }, []);

  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-5 ">
        <div className="flex ">
          <ButtonUpload
            text="Upload Ledger"
            icon={<Upload2 />}
            link="upload-ledger"
          />
        </div>
      </div>
      <BoardFilter text="Uploaded file">
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
      {/* <div>
        {loading ? (
          <div className="flex justify-center items-center mt-32">
            <Spinner
              spin={loading}
              className="border-2 border-primary "
              size={9}
            />
          </div>
        ) : (
          <DataTable data={ledgers} columns={UploadColumns} />
        )}
      </div> */}
    </div>
  );
}
