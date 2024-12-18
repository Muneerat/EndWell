"use client";
import React, { useEffect, useState } from "react";
import { fetchTransaction } from "./action";
import handleErrors from "@/app/data/handleErrors";
import { fetchMonths, fetchYears } from "../upload-ledger/action";
import {
  Select,
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

export default function Eoyasset() {
  const [eoyasset, setEoyasset] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(null);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMember, setSelectedMember] = useState("all");
  const dispatch = useDispatch();

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await dispatch(
          getAllMembers(["id", "first_name", "last_name"])
        );
        setMembers(response.payload);
      } catch (error) {
        setErrors("Failed to load member data.");
      }
    };
    loadMembers();
  }, [dispatch]);

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

  useEffect(() => {
    const fetchEoyassets = async () => {
      if (!selectedYear && !selectedMonth) return;
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

  return (
    <div className="md:px-6 py-10 sm:px-1 m-3">
   
        <div className="flex flex-col my-5 md:p-1 p-5 w-full lg: shadow-sm rounded-md mx-auto">
          {error && <p className="pb-8 text-red-700 text-sm">{error}</p>}
          <BoardFilter text="Eoyasset History">
            <div className="flex gap-6 mb-5">
              <Select onValueChange={(value) => setSelectedYear(value)}>
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
              </Select>

              {/* <Select onValueChange={(value) => setSelectedMonth(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={selectedMonth || "Select Month"} />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={String(month.value)}>
                      {month.key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select> */}

              <Select onValueChange={(value) => setSelectedMember(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue
                    placeholder={selectedMember || "Select Member"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  {members.map((member) => (
                    <SelectItem key={member.id} value={String(member.id)}>
                      {member.first_name} {member.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
