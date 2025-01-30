/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Building2,
  CarFront,
  Fuel,
  Gem,
  LifeBuoy,
  Palette,
  Calendar,
  Users,
  X,
} from "lucide-react";
import { FaRegSnowflake } from "react-icons/fa";
import React, { useState } from "react";
import { useLocale } from "next-intl";

const icons: any = {
  model: <CarFront size={24} />,
  maker: <Building2 size={24} />,
  vehicleType: <LifeBuoy size={24} />,
  fuel: <Fuel size={24} />,
  drive: <Gem size={24} />,
  condition: <FaRegSnowflake size={24} />,
  color: <Palette size={24} />,
  grade: <Gem size={24} />,
  manufactureYear: <Calendar size={24} />,
  maxPassengers: <Users size={24} />,
};

type FilterItem = {
  [key: string]: string[];
};

const Filterbar = ({
  filters,
  onApplyFilters,
  initialSelectedFilters,
  close,
}: {
  filters: FilterItem;
  onApplyFilters: (selectedFilters: { [key: string]: string[] }) => void;
  initialSelectedFilters: { [key: string]: string[] }; // Initial state to persist filters
  close?: () => void;
}) => {
  // Local state to manage filter selection
  const [localSelectedFilters, setLocalSelectedFilters] = useState<{
    [key: string]: string[];
  }>(initialSelectedFilters);
  const locale = useLocale();

  const handleFilterSelect = (name: string, value: string) => {
    setLocalSelectedFilters((prev) => {
      const prevValues = prev[name] || [];
      if (prevValues.includes(value)) {
        return {
          ...prev,
          [name]: prevValues.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [name]: [...prevValues, value],
        };
      }
    });
  };

  const applyFilters = () => {
    const cleanedFilters = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(localSelectedFilters).filter(
        ([_, values]) => values.length > 0
      )
    );
    onApplyFilters(cleanedFilters);
  };

  return (
    <div className="relative max-w-[560px] min-w-[320px] max-h-screen lg:max-h-max overflow-y-auto lg:h-auto w-full bg-white rounded-xl p-6 border border-gray-200 shadow-md">
      <button type="button" className="bg-black font-medium" onClick={close}>
        {" "}
        <X size={40} />{" "}
      </button>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Filter Vehicles
      </h2>
      <button
        type="button"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium mb-4 hover:bg-blue-700 transition"
        onClick={applyFilters}
      >
        Apply Filters
      </button>

      {Object.keys(filters).length > 0 ? (
        Object.keys(filters).map((filterKey) => (
          <div className="w-full mb-6" key={filterKey}>
            <div className="w-full flex items-center mb-2 text-gray-800">
              <span className="mr-2">{icons[filterKey] || null}</span>
              <h3 className="text-lg font-semibold capitalize">{filterKey}</h3>
            </div>
            <div className="w-full grid grid-cols-3 gap-2">
              {filters[filterKey].map((item) => {
                let splitValue: string | undefined;
                const parts = item.toString().split("/");

                if (locale === "en") {
                  splitValue = parts[0]; 
                } else {
                  splitValue = parts[1] || parts[0]; 
                }

                if (splitValue.includes(",")) {
                  const conditions = splitValue.split(",");
                  return conditions.map((cond: any) => (
                    <label
                      className="flex items-center cursor-pointer bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-200 transition"
                      key={cond}
                    >
                      <input
                        type="checkbox"
                        id={${filterKey}-${cond}}
                        name={cond}
                        value={cond}
                        checked={
                          localSelectedFilters[filterKey]?.includes(cond) ||
                          false
                        } // Use local state
                        className="mr-2 accent-blue-600"
                        onChange={() => handleFilterSelect(filterKey, cond)}
                      />
                      {cond}
                    </label>
                  ));
                } else {
                  return (
                    <label
                      className="flex items-center cursor-pointer bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-200 transition"
                      key={splitValue}
                    >
                      <input
                        type="checkbox"
                        id={${filterKey}-${splitValue}}
                        name={splitValue}
                        value={splitValue}
                        checked={
                          localSelectedFilters[filterKey]?.includes(
                            splitValue
                          ) || false
                        } // Use local state
                        className="mr-2 accent-blue-600"
                        onChange={() =>
                          handleFilterSelect(filterKey, splitValue)
                        }
                      />
                      {splitValue}
                    </label>
                  );
                }
              })}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <h1 className="text-gray-600">No filters available</h1>
        </div>
      )}
    </div>
  );
};

export default Filterbar;