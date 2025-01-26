/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import VehicleCard from "./vehicleCard";

export type vehicleSectionProps = {
  vehicles: any[];
};
const VehicleSection = ({ vehicles }: vehicleSectionProps) => {
  return (
    <div className="max-w-[1100px] w-full h-auto mx-auto flex flex-col items-end  space-y-4 relative">
      <div className="">
        <div className="w-full md:w-[337px] h-[43px] mx-auto md:ml-[436px] p-4 flex items-center rounded-[50px] border-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-black mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Your Vehicle in mind"
            className="lg:text-[15px] text-black w-full px-4 py-2 focus:outline-none rounded-lg"
          />
        </div>
      </div>
      <div className="mt-5 w-full flex items-end justify-start flex-col">
        {vehicles ? (
          vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))
        ) : (
          <div className="flex items-center justify-center min-h-[300px]">
            <p> No vehicles found </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleSection;
