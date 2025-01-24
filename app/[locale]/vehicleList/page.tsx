"use client";

import React from "react";
import SearchVehicle from "../searchVehicle/page";


import Navbar from "@/components/Navbar";
import Filterbar from "@/components/vehicleCard/filterbar";

function Details() {
  return (
    <div className="relative w-full flex flex-col max-w-[1366px] mx-auto px-4 py-2">
      <div className="bg-[#08001C67] w-full flex items-center justify-center border border-[#00CCEE] rounded-[10px] min-h-32 my-auto">
        <Navbar />
      </div>

      <div className="mt-[36px] flex">
        
      <Filterbar />
        <SearchVehicle />
      </div>
    </div>
  );
}

export default Details;
