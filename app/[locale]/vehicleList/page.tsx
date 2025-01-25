/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import SearchVehicle from "../searchVehicle/page";
import Navbar from "@/components/Navbar";
import Filterbar from "@/components/vehicleCard/filterbar";
import axios from "axios";
import { PulseLoader } from 'react-spinners'

// Async function to fetch filters
async function getFilters() {
  try {
    const res = await axios.get("http://localhost:3000/api/filters/"); // Update the URL accordingly

    const data = res.data;
    const formattedFilters: { [key: string]: string[] } = {};

    for (const key in data) {
      if (key === "manufactureYear") {
        // Extract only the year, ensuring type safety
        formattedFilters[key] = data[key]
          .map((item: any) => {
            const dateValue = Object.values(item)[0] as string; // Explicitly cast to string
            return new Date(dateValue).getFullYear().toString(); // Convert to year
          })
          .filter((year: string, index: number, self: string[]) => self.indexOf(year) === index); // Ensure distinct years
      } else {
        formattedFilters[key] = data[key].map((item: any) => Object.values(item)[0]);
      }
    }

    return formattedFilters;
  } catch (error) {
    console.error("Error fetching filters:", error);
    return {};
  }
}

function Details() {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(true);

  // Fetch filters on component mount
  useEffect(() => {
    const fetchFilters = async () => {
      const data = await getFilters();
      setFilters(data);
      setLoading(false);
    };

    fetchFilters();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PulseLoader color="#2563eb" size={20} />
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col max-w-[1366px] mx-auto px-4 py-2">
      <div className="bg-[#08001C67] w-full flex items-center justify-center border border-[#00CCEE] rounded-[10px] min-h-32 my-auto">
        <Navbar />
      </div>

      <div className="mt-[36px] flex">
        {/* Pass filters as props once fetched */}
        <Filterbar filters={filters} />
        <SearchVehicle />
      </div>
    </div>
  );
}

export default Details;
