'use client'
import Card from "../components/card";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import { Sms } from "@/assets/icon";
import BoardFilter from "../components/board";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SMSColumns, SMSData } from "@/app/data/SMSData";
import { useEffect, useState } from "react";
import { allMessage } from "./action";
import Spinner from "@/app/components/Spinner";
import handleErrors from "@/app/data/handleErrors";

export default function SMS() {
  const  [message, setAllMessage] = useState([])
  const [errors, setErrors] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const allMessages = async () => {
      setLoading(true)
      try{
        const response = await allMessage();
        const messages = response.messages
        const formattedData = messages.map((member, index) => ({
                 ID: index + 1,
                 id: member.id,
                 member_name: member.member_name,
                 phone: member.phone,
                 date: member.date,
                 status: member.status,
              }));
          setAllMessage(formattedData)
      }catch(error){
        console.log(error,"Failed to load messages.")
        handleErrors(error, setErrors("Failed to load message parameters."));
      }finally{
        setLoading(false)
      }
    }; 
    allMessages();
  },[])

  return (
    <div className="">
      <div className="flex justify-end w-full px-6 py-5 ">
      
        <div className="flex ">
          <ButtonUpload text="Send SMS" icon={<Sms/>}  link="SendSMS"/>
        </div>
      </div>
      <BoardFilter text='Messages'>
      </BoardFilter>
      <div>
        {/* <DataTable data={SMSDatas} columns={SMSColumns}/> */}
        <div>
        {loading ? (
          <div className="flex justify-center items-center mt-32">
            <Spinner
              spin={loading}
              className="border-2 border-primary "
              size={9}
            />
          </div>
        ) : errors?(
          <div>{errors}</div>
        ):
         (
          <DataTable data={message} columns={SMSColumns} />
        )}
      </div>
      </div>
    </div>
  );
}
