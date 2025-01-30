"use client";

import React, { useState, useEffect } from "react";
import Spinner from "@/app/components/Spinner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BoardFilter from "../../dashboard/components/board";
import { DataTable } from "../../dashboard/components/table";
import { userWithdrawableColumns } from "@/app/data/userWithrawable";
import { getMemberProfile } from "@/Services/memberProfileService";

export default function WithdrawableDividend() {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState(null);
  const [uploadData, setUploadData] = useState([]);
  const { userInfo } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemberProfile({}));
  }, []);

  // Fetch all withdrawable dividends
  useEffect(() => {
    const fetchWithdrawableDividend = async () => {
      setProcessing(true);
      try {
        const response = await axios.get("/withdrawable/dividend", {
          params: { member_id: userInfo.id },
        });

        const data = response.data.member_requests;

        const withdrawableRequests = data.map((withdrawableRequest, index) => ({
          ID: index + 1,
          id: withdrawableRequest.id,
          member_name: withdrawableRequest.member_name,
          year: withdrawableRequest.year,
          status: withdrawableRequest.status,
          created_at: withdrawableRequest.created_at,
        }));

        setUploadData(withdrawableRequests);
      } catch (error) {
        setErrors("Failed to fetch member requests: " + error.message);
      } finally {
        setProcessing(false);
      }
    };
    fetchWithdrawableDividend();
  }, []);

  return (
    <div>
      <div className="flex justify-end w-full px-6 py-5"></div>
      <BoardFilter text="Withdrawable Dividend">
        <div className="flex gap-6"></div>
      </BoardFilter>
      <div>
        {processing ? (
          <div className="flex justify-center items-center mt-32">
            <Spinner
              spin={processing}
              className="border-2 border-primary"
              size={9}
            />
          </div>
        ) : (
          <DataTable data={uploadData} columns={userWithdrawableColumns} />
        )}
      </div>
    </div>
  );
}
