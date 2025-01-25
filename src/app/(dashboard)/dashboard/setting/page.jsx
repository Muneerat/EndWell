"use client";
import React, { useEffect, useState } from "react";
import BoardFilter from "../components/board";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { fetchMessageTemplate } from "./action";
import handleErrors from "@/app/data/handleErrors";
import Spinner from "@/app/components/Spinner";

export default function Setting() {
  const router = useRouter();
  const [messageTemplate, setMessageTemplate] = useState({});
  const [error, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch message Template
    const fetchMessage = async () => {
      setLoading(true);
      try {
        const response = await fetchMessageTemplate();
        setMessageTemplate(response);
      } catch {
        // console.log(error);

        handleErrors(error, setErrors("Failed to fetch message template"));
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto h-screen">
        <Spinner
          className="border-2 border-primary "
          size={9}
          spin={true}
        ></Spinner>
      </div>
    );
  }

  return (
    <div>
      <BoardFilter text="Message Template"></BoardFilter>
      <div>
        <div className="flex justify-end mx-6">
          <Button onClick={() => router.push(`/dashboard/templateStore`)}>
            Set Message Template
          </Button>
        </div>
        <div className="grid grid-cols-1  gap-8 my-6 md:w-3/6 md:mx-10 mx-5">
          <div className="md:flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-bold">
              General Message:
            </span>
            <span className="capitalize text-sm">
              {messageTemplate.general_message || " "}
            </span>
          </div>
          <div className="md:flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-bold">
              Eoyasset Message:
            </span>
            <span className="capitalize text-sm">
              {messageTemplate.eoyasset_message || "-"}
            </span>
          </div>
          <div className="md:flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-bold">
              contribution Message:
            </span>
            <span className="capitalize text-sm">
              {messageTemplate.contribution_message || "N/A"}
            </span>
          </div>
          <div className="md:flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-bold">
              Dividend Message:
            </span>
            <span className="capitalize text-sm">
              {messageTemplate.dividend_message || "N/A"}
            </span>
          </div>
          <div className="md:flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-bold">
              Withdrawable Dividend Message:
            </span>
            <span className="capitalize text-sm">
              {messageTemplate.withdrawable_dividend_message || "N/A"}
            </span>
          </div>
          <div className="md:flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-bold">
              Price per unit:
            </span>
            <span className="capitalize text-sm">
              {messageTemplate.price_per_unit || "N/A"}
            </span>
          </div>
          <div className="md:flex items-center gap-x-6">
            <span className="sm:w-40 flex-shrink-0 text-sm font-bold">
              phone Number:
            </span>
            <span className="capitalize text-sm">
              {messageTemplate.phone || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
