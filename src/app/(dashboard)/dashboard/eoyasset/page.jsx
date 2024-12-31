"use client";

import React, { useEffect, useRef, useState } from "react";
import { fetchTransaction } from "./action";
import handleErrors from "@/app/data/handleErrors";
import { fetchMonths, fetchYears } from "../upload-ledger/action";
import {
  Select as CustomSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch } from "react-redux";
import { getAllMembers } from "@/Services/membersServie";
import Spinner from "@/app/components/Spinner";
import { DataTable } from "../components/table";
import BoardFilter from "../components/board";
import { TransactionColumns } from "@/app/data/transaction";
import { fetchEoyasset } from "./action";
import { EoyassetColumns } from "@/app/data/eoyasset";
import SelectSearch from "react-select-search";
// import Select from 'react-select'
import Select from "react-select";

export default function Eoyasset() {
  const [eoyasset, setEoyasset] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMember, setSelectedMember] = useState("all");
  const dispatch = useDispatch();

  // Fetch members
  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await dispatch(
          getAllMembers(["id", "first_name", "last_name"])
        );
        if (response?.payload && Array.isArray(response.payload)) {
          setMembers(response.payload);
        } else {
          setErrors(response.payload?.message || "No record found.");
          setMembers([]);
        }
      } catch (error) {
        setErrors("Failed to load member data.");
      }
    };
    loadMembers();
  }, [dispatch]);

  const memberOptions = [
    { value: "select", label: "Select Members" },
    { value: "all", label: "All Members" },
    ...members.map((member) => ({
      value: member.id,
      label: `${member.first_name} ${member.last_name}`,
    })),
  ];

  // Fetch years
  useEffect(() => {
    const loadYears = async () => {
      try {
        const allYears = await fetchYears();
        setYears(Object.values(allYears.months));
      } catch (error) {
        setErrors("Failed to load years.");
      }
    };
    loadYears();
  }, []);

  // Fetch months
  useEffect(() => {
    const loadMonths = async () => {
      try {
        const monthData = await fetchMonths();
        const formattedMonths = Object.entries(monthData.months).map(
          ([key, value]) => ({
            key,
            value,
          })
        );
        setMonths(formattedMonths);
      } catch (error) {
        setErrors("Failed to load months.");
      }
    };
    loadMonths();
  }, []);

  // Fetch eoyassets
  useEffect(() => {
    const fetchEoyassets = async () => {
      if (!selectedYear) return;
      setLoading(true);
      setEoyasset([]);
      try {
        const response = await fetchEoyasset({
          year: selectedYear,
          id: selectedMember === "all" ? null : Number(selectedMember),
        });

        if (response.length === 0) {
          setErrors("No transactions found for the selected criteria.");
        } else {
          const Eoyasset = response.map((eoyasset, index) => ({
            ID: index + 1,
            member_id: eoyasset.member_id,
            member_name: eoyasset.member_name,
            january: eoyasset.january,
            february: eoyasset.february,
            march: eoyasset.march,
            april: eoyasset.april,
            may: eoyasset.may,
            june: eoyasset.june,
            july: eoyasset.july,
            august: eoyasset.august,
            september: eoyasset.september,
            october: eoyasset.october,
            november: eoyasset.november,
            december: eoyasset.december,
            eoyasset: eoyasset.eoyasset,
            total_dividend: eoyasset.total_dividend,
            total_withdrawable: eoyasset.total_withdrawable,
          }));
          setEoyasset(Eoyasset);
          setErrors(null);
        }
      } catch (error) {
        handleErrors(error, setErrors);
      } finally {
        setLoading(false);
      }
    };

    fetchEoyassets();
  }, [selectedYear, selectedMember]);

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#fff",
      borderRadius: "8px",
      border: "2px solid #000680",
      padding: "6px",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isFocused ? "#fff" : isSelected ? "#fff" : "#fff",
      color: "#333",
      padding: "10px",
    }),
  };

  const handleMemberChange = (selectedOption) => {
    setSelectedMember(selectedOption?.value || "all");
  };

  return (
    <div className="md:px-6 py-10 sm:px-1 m-3">
      <div className="flex flex-col my-5 md:p-1 p-5 w-full lg:shadow-sm rounded-md mx-auto">
        {error && <p className="pb-8 text-red-700 text-sm">{error}</p>}
        <BoardFilter text="Eoyasset History">
          <div className="flex gap-6 mb-5">
            <CustomSelect onValueChange={(value) => setSelectedYear(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={selectedYear || "Select Year"} />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </CustomSelect>

            <Select
              options={memberOptions}
              placeholder="Select Member"
              onChange={handleMemberChange}
              value={memberOptions.find((opt) => opt.value === selectedMember)}
              className="w-[180px] "
              styles={customStyles}
            />
          </div>
        </BoardFilter>
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <Spinner
              className="border-2 border-primary"
              size={9}
              spin={loading}
            />
          </div>
        ) : eoyasset.length > 0 ? (
          <DataTable data={eoyasset} columns={EoyassetColumns} />
        ) : (
          <p className="text-center text-gray-600">No transactions found.</p>
        )}
      </div>
    </div>
  );
}
