"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "../components/table";
import BoardFilter from "../components/board";
import Spinner from "@/app/components/Spinner";
import { WithdrawableColumns } from "@/app/data/withdrawableDividend";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export default function WithdrawableDividend() {
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState(null);
  const [uploadData, setUploadData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState("");
  const [requestStatusOptions, setRequestStatusOptions] = useState([]);

  // Fetch request status options
  useEffect(() => {
    const fetchRequestStatus = async () => {
      try {
        const response = await axios.get(`/request-status`, {
          headers: { Role: "admin" },
        });

        const statusOptions = response.data.data;
        setRequestStatusOptions(statusOptions);

        console.log(response.data.data);
      } catch (e) {
        console.error("Failed to fetch request status:", e);
      }
    };
    fetchRequestStatus();
  }, []);

  // Fetch all withdrawable dividends
  useEffect(() => {
    const fetchWithdrawableDividend = async () => {
      setProcessing(true);
      try {
        const response = await axios.get("/withdrawable/dividend", {
          headers: { Role: "admin" },
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

  // Open modal with selected request details
  const handleEdit = (request) => {
    setSelectedRequest(request);
    setModalOpen(true);
  };

  // Handle status update
  const handleStatusChange = (status) => {
    if (selectedRequest) {
      setSelectedRequest((prev) => ({ ...prev, status }));
    }
  };

  // Submit updated status
  const handleSave = async () => {
    if (!selectedRequest) return;

    setProcessing(true);
    try {
      await axios.put(
        `/admin/transaction/withdrawable/dividen/requestUpdate/`,
        {
          id: selectedRequest.id,
          status: selectedRequest.status,
        },
        {
          headers: { Role: "admin" },
        }
      );
      // Update the UI with the new status
      setUploadData((prevData) =>
        prevData.map((item) =>
          item.id === selectedRequest.id
            ? { ...item, status: selectedRequest.status }
            : item
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to update request status:", error);
    } finally {
      setProcessing(false);
    }
  };

  const columnsWithActions = WithdrawableColumns.map((column) =>
    column.id === "actions"
      ? {
          ...column,
          cell: ({ row }) => (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                  Edit Status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        }
      : column
  );

  return (
    <div>
      <div className="flex justify-end w-full px-6 py-5"></div>
      <BoardFilter text="Member request SMS transactions">
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
          <DataTable data={uploadData} columns={columnsWithActions} />
        )}
      </div>
      {modalOpen && selectedRequest && (
        <div className="fixed inset-0  m-auto bg-black bg-opacity-70 z-50">
          <Card className="w-[350px] m-auto mt-32 bg-white">
            <CardHeader>
              <CardTitle>Edit Status</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="memberName">Member Name</Label>
                    <Input
                      id="memberName"
                      value={selectedRequest.member_name}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      onValueChange={handleStatusChange}
                      value={selectedRequest.status || ""}
                    >
                      <SelectTrigger id="status">
                        <SelectValue
                          placeholder={selectedRequest.status || "Select"}
                        />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {requestStatusOptions.map((status, index) => (
                          <SelectItem key={index} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button className=" hover:text-primary" onClick={handleSave}>
                Save
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
