"use client";
import React, { useState, useEffect } from "react";
// import Card from "../components/card";
// import ButtonUpload from "../components/button";
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
import { memberRequestsColumns } from "@/app/data/memberRequest";
import BoardFilter from "../../dashboard/components/board";
import { DataTable } from "../../dashboard/components/table";

export default function MemberRequest() {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadData, setUploadData] = useState([]);
  const dispatch = useDispatch();
  const { userInfo} = useSelector((state) => state.userAuth);
//   const { ledgers, totalLedgers, loading, error } = useSelector(
//     (state) => state.ledger
//   );

  //fetch all ledger files
  useEffect(() => {
    const fetchTransactionRequest = async () => {
      setProcessing(true)
      try{
        const response = await axios.get("/transaction-request",{ params: { member_id: userInfo.id }});
        const data = await response.data.member_requests;
        const memberRequests = data.map((memberRequest,index) => ({
          ID: index + 1,
          id: memberRequest.id,
          member_name: memberRequest.member_name,
          month: memberRequest.month,
          phone: memberRequest.phone,
          request_date: memberRequest.request_date,
          request_type: memberRequest.request_type,
           status: memberRequest.status,
          year: memberRequest.year,
        }))
        setUploadData(memberRequests);

       
        return response.data.member_requests
      }catch(error){
        console.log("Failed to fetch member requests files", error);
      }finally{
        setProcessing(false)
      }
    }
    fetchTransactionRequest();
  }, [ userInfo.id]);

  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-5 ">
      </div>
      <BoardFilter text="Member request sms transactions ">
        <div className="flex gap-6 ">
          
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
          <DataTable data={uploadData} columns={memberRequestsColumns} />
        )}
      </div>
    </div>
  );
}
