"use client";
import React, { useState, useEffect } from "react";
import Card from "../components/card";
import ButtonUpload from "../components/button";
import { DataTable } from "../components/table";
import BoardFilter from "../components/board";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { Upload2 } from "@/assets/icon";
import { UploadColumns, UploadData } from "@/app/data/UploadData";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLedgers } from "@/Store/features/ledgerSlice";
import Spinner from "@/app/components/Spinner";
import { getAllLedger } from "@/Services/ledgerService";
import { addToast } from "@/Store/features/toastSlice";

export default function Uploaded() {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadData, setUploadData] = useState([]);
  const dispatch = useDispatch();
  const { ledgers, totalLedgers, loading, error } = useSelector(
    (state) => state.ledger
  );

  //fetch all ledger files
  useEffect(() => {
    // const ledgerFiles = async () => {
    //   setProcessing(true)
    //   try{
    //     const response = await axios.get("/admin/ledger/all");
    //     const data = await response.data.ledgers;
    //     const ledgers = data.map((ledger,index) => ({
    //       ID: index + 1,
    //       id: ledger.id,
    //       fileName: ledger.file_name,
    //       fileType: ledger.file_type,
    //       dateUploaded: ledger.date,
    //       status: ledger.status,
    //       uploaded_by: ledger.uploaded_by,
    //     }))
    //     setUploadData(ledgers);

    //     dispatch(setLedgers(ledgers))
    //     return response.data.ledger
    //   }catch(error){
    //     console.log("Failed to fetch ledger files", error);
    //   }finally{
    //     setProcessing(false)
    //   }
    // }
    // ledgerFiles();
    dispatch(getAllLedger());
    
  }, [dispatch]);

      // Actions for table
      const handleActions = {
        
        delete: async (ledger) => {
          try {
            const response = await axios.delete(`/admin/ledger/delete`, {
              headers: {Role: 'admin'},
              data: { id: ledger.id }, 
            });
        
            dispatch(getAllLedger());
            dispatch(addToast({
              type:'success',
              message: response.data.message
            }))
            return response.data.message;
  
          } catch (error) {
            dispatch(addToast({
              type:'error',
              message: error.response.data.message
            }))
          }
        },
      };


  const columnsWithActions = UploadColumns.map((column) =>
    column.id === "actions"
      ? {
          ...column,
          cell: ({ row }) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0  ">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleActions.delete(row.original)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        }
      : column
  );

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
        <div className="flex gap-6"></div>
      </BoardFilter>
      <div>
        {loading ? (
          <div className="flex justify-center items-center mt-32">
            <Spinner
              spin={loading}
              className="border-2 border-primary "
              size={9}
            />
          </div>
        ) : (
          <DataTable data={ledgers} columns={columnsWithActions} />
        )}
      </div>
    </div>
  );
}
