"use client";
import React, { useState, useEffect } from "react";
import Card from "../components/card";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import BoardFilter from "../components/board";

import { UploadColumns, UploadData } from "@/app/data/UploadData";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLedgers } from "@/Store/features/ledgerSlice";
import Spinner from "@/app/components/Spinner";
import { getAllLedger } from "@/Services/ledgerService";
import { memberRequestsColumns } from "@/app/data/memberRequest";

export default function WithdrawableDividend() {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadData, setUploadData] = useState([]);
  const dispatch = useDispatch();
  //   const { ledgers, totalLedgers, loading, error } = useSelector(
  //     (state) => state.ledger
  //   );

  //fetch all ledger files
  useEffect(() => {
    const fetchWithdrawableDividend = async () => {
      setProcessing(true);
      try {
        const response = await axios.get("/withdrawable/dividend", {
          headers: { Role: "admin" },
        });
        const data = await response.data;
        console.log(data);

        // const withdrawableRequests = data.map((withdrawableRequest, index) => ({
        //   ID: index + 1,
        //   id: withdrawableRequest.id,
        //   member_name: withdrawableRequest.member_name,
        //   year: withdrawableRequest.year,
        //   status: withdrawableRequest.status,
        //   created_at: withdrawableRequest.created_at,
        // }));
        // setUploadData(withdrawableRequests);

        // return response.data.member_requests;
      } catch (error) {
        setErrors("Failed to fetch member requests files", error.message);
      } finally {
        setProcessing(false);
      }
    };
    fetchWithdrawableDividend();
  }, []);

  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-5 "></div>
      <BoardFilter text="Member request sms transactions ">
        <div className="flex gap-6 "></div>
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
