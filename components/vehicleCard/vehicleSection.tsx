/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import VehicleCard from "./vehicleCard";
import { Filter } from "lucide-react";
import Filterbar from "./filterbar";

export type VehicleSectionProps = {
    vehicles: any[];
    onSearchChange: (searchTerm: string) => void;
    filters: { [key: string]: string[] };
    onApplyFilters: (selectedFilters: { [key: string]: string[] }) => void;
    initialSelectedFilters: { [key: string]: string[] };
  };
  
  const VehicleSection: React.FC<VehicleSectionProps> = ({
    vehicles,
    onSearchChange,
    filters,
    onApplyFilters,
    initialSelectedFilters,
  }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [toggle, setToggle] = useState(false)

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear the previous debounce timeout if there was one
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to call the search function after 500ms (you can adjust this delay)
    const timeout = setTimeout(() => {
      onSearchChange(query);
    }, 1000);

    setDebounceTimeout(timeout);
  };

  return (
    <div className="max-w-[1100px]  w-full h-auto mx-auto flex flex-col items-end space-y-4 relative">
      <div className=" flex items-center gap-3">
        <Filter size={40} className=" lg:hidden" onClick={() => {setToggle(!toggle)}} />
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
            value={searchQuery}
            onChange={handleSearchInputChange}
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
            <p>No vehicles found</p>
          </div>
        )}
      </div>
      {toggle && (
        <div className="fixed -top-5 left-0 w-full h-full bg-[#0000002a] flex items-start justify-end overflow-auto ">
        <Filterbar
              filters={filters}
              onApplyFilters={onApplyFilters}
              initialSelectedFilters={initialSelectedFilters}
              close={() => {setToggle(!toggle)}}
            />
        </div>
      )}
    </div>
  );
};

export default VehicleSection;
