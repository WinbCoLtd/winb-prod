/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import SearchVehicle from "../searchVehicle/page";
import Navbar from "@/components/Navbar";
import Filterbar from "@/components/vehicleCard/filterbar";
import axios from "axios";
import { PulseLoader } from 'react-spinners'
import { useRouter } from "next/router";


async function getFilters() {
  try {
    const res = await axios.get("/api/filters/"); 

    const data = res.data;
    const formattedFilters: { [key: string]: string[] } = {};

    for (const key in data) {
      if (key === "manufactureYear") {
      
        formattedFilters[key] = data[key]
          .map((item: any) => {
            const dateValue = Object.values(item)[0] as string; 
            return new Date(dateValue).getFullYear().toString();
          })
          .filter((year: string, index: number, self: string[]) => self.indexOf(year) === index); 
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

async function getVehicles(query: object) {
  try {
    const res = await axios.get(`/api/vehicles/${query}`)
    const data = res.data;
    return data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
  }
}

function Details() {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState(true);
  const router = useRouter();
  console.log(vehicles);

  useEffect(() => {
    const fetchFilters = async () => {
      const data = await getFilters();
      setFilters(data);
    };
    const fetchVehicles = async () => {
      const queryObject ={ ...router.query};
      const data = await getVehicles(queryObject);
      setVehicles(data);
    }

    fetchFilters();
    fetchVehicles();
    setLoading(false);
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
      <div className="mt-[36px] mb-5 flex">
        <div className="hidden lg:block ">
           <Filterbar filters={filters} />
        </div>
        <SearchVehicle />
      </div>
    </div>
  );
}

export default Details;
