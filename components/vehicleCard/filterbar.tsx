// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   Building2,
//   CarFront,
//   Fuel,
//   Gem,
//   LifeBuoy,
//   Palette,
//   Calendar,
//   Users,
//   X,
// } from "lucide-react";
// import { FaRegSnowflake } from "react-icons/fa";
// import React, { useState } from "react";
// import { useLocale } from "next-intl";

// const icons: any = {
//   model: <CarFront size={24} />,
//   maker: <Building2 size={24} />,
//   vehicleType: <LifeBuoy size={24} />,
//   fuel: <Fuel size={24} />,
//   drive: <Gem size={24} />,
//   condition: <FaRegSnowflake size={24} />,
//   color: <Palette size={24} />,
//   grade: <Gem size={24} />,
//   manufactureYear: <Calendar size={24} />,
//   maxPassengers: <Users size={24} />,
// };

// type FilterItem = {
//   [key: string]: string[];
// };

// const Filterbar = ({
//   filters,
//   onApplyFilters,
//   initialSelectedFilters,
//   close,
// }: {
//   filters: FilterItem;
//   onApplyFilters: (selectedFilters: { [key: string]: string[] }) => void;
//   initialSelectedFilters: { [key: string]: string[] }; // Initial state to persist filters
//   close?: () => void;
// }) => {
//   // Local state to manage filter selection
//   const [localSelectedFilters, setLocalSelectedFilters] = useState<{
//     [key: string]: string[];
//   }>(initialSelectedFilters);

//   const locale = useLocale();

//   const handleFilterSelect = (name: string, value: string) => {
//     setLocalSelectedFilters((prev) => {
//       const prevValues = prev[name] || [];
//       if (prevValues.includes(value)) {
//         return {
//           ...prev,
//           [name]: prevValues.filter((item) => item !== value),
//         };
//       } else {
//         return {
//           ...prev,
//           [name]: [...prevValues, value],
//         };
//       }
//     });
//   };

//     const applyFilters = () => {
//     const cleanedFilters = Object.fromEntries(
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       Object.entries(localSelectedFilters).filter(
//         ([_, values]) => values.length > 0
//       )
//     );
//     onApplyFilters(cleanedFilters);
//   };

//   return (
//     <div className="relative max-w-[360px] min-w-[320px] max-h-screen lg:max-h-max overflow-y-auto lg:h-auto w-full bg-white rounded-xl p-6 border border-gray-200 shadow-md">
//       <button type="button" className=" font-medium" onClick={close}>
//         {" "}
//         <X size={30} />{" "}
//       </button>
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">
//       {locale === "en" ? "Filter Vehicles" : "車両をフィルタリング"}

//       </h2>
//       <button
//         type="button"
//         className="w-full bg-slate-500 text-white py-2 rounded-lg font-medium mb-12  hover:bg-slate-400 transition"
//         onClick={applyFilters}
//       >
//          {locale === "en" ? " Apply Filters" : "フィルターを適用する"}

//       </button>

//       {Object.keys(filters).length > 0 ? (

//         Object.keys(filters).map((filterKey) => (
//           <div className="w-full mb-6" key={filterKey}>
//             <div className="w-full flex items-center mb-2 text-gray-800">
//               <span className="mr-2">{icons[filterKey] || null}</span>
//               <h3 className="text-[16px] font-semibold capitalize">{filterKey}</h3>
//             </div>

//             <div className="w-full grid grid-cols-3 gap-2">
//               {filters[filterKey].map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => handleFilterSelect(filterKey, item)}
//                   className={`mt-4 mb-3 flex items-center justify-center gap-2 cursor-pointer px-3 py-1 rounded-[15px] text-[14px] transition ${
//                     localSelectedFilters[filterKey]?.includes(item)
//                       ? "border border-winb-blue-border bg-yellow-200 text-winb-text-dark-blue"
//                       : "bg-white border border-winb-blue-border text-winb-text-dark-blue font-semibold hover:bg-gray-200"
//                   }`}
//                 >
//                   <span>{item}</span>
//                   {localSelectedFilters[filterKey]?.includes(item) && (
//                     <span
//                       onClick={(e) => {
//                         e.stopPropagation(); // Prevent button click event
//                         handleFilterSelect(filterKey, item);
//                       }}
//                       className="text-winb-text-dark-blue text-sm font-bold cursor-pointer"
//                     >
//                       ✕
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))
//       ) : (
//         <div className="flex items-center justify-center">
//           <h1 className="text-gray-600">No filters available</h1>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Filterbar;
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
  initialSelectedFilters: { [key: string]: string[] };
  close?: () => void;
}) => {
  const [localSelectedFilters, setLocalSelectedFilters] = useState<{
    [key: string]: string[];
  }>(initialSelectedFilters);

  const locale = useLocale();

  const handleFilterSelect = (name: string, value: string) => {
    setLocalSelectedFilters((prev) => {
      const prevValues = prev[name] || [];
      return {
        ...prev,
        [name]: prevValues.includes(value)
          ? prevValues.filter((item) => item !== value)
          : [...prevValues, value],
      };
    });
  };

  const applyFilters = () => {
    const cleanedFilters = Object.fromEntries(
      Object.entries(localSelectedFilters).filter(
        ([, values]) => values.length > 0
      )
    );
    onApplyFilters(cleanedFilters);
  };

  return (
    <div className="relative max-w-[360px] min-w-[320px] w-full bg-white rounded-xl p-6 border border-gray-200 shadow-md">
      <button type="button" className="text-gray-700" onClick={close}>
        <X size={30} />
      </button>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {locale === "en" ? "Filter Vehicles" : "車両をフィルタリング"}
      </h2>
      <button
        type="button"
        className="w-full bg-slate-500 text-white py-2 rounded-lg font-medium mb-12  hover:bg-slate-400 transition"
        onClick={applyFilters}
      >
        {locale === "en" ? "Apply Filters" : "フィルターを適用する"}
      </button>
      {Object.keys(filters).length > 0 ? (
        Object.keys(filters).map((filterKey) => (
          <div className="w-full mb-6" key={filterKey}>
            <div className="w-full flex items-center mb-2 text-gray-800">
              <span className="mr-2">{icons[filterKey] || null}</span>
              <h3 className="text-[16px] font-semibold capitalize">
                {filterKey}
              </h3>
            </div>
            <div className="w-full grid grid-cols-3 gap-2">
              {filters[filterKey].map((item) => {
                let splitValue;
                const parts = item.toString().split("/");
                splitValue = locale === "en" ? parts[0] : parts[1] || parts[0];
                return (
                  <label
                    className={`flex items-center justify-center cursor-pointer  text-white font-medium border border-blue-700 rounded-lg px-4 py-2 hover:bg- transition ${
                      localSelectedFilters[filterKey]?.includes(splitValue)
                        ? "border border-winb-blue-border bg-yellow-200 text-winb-text-dark-blue"
                        : "bg-white border border-winb-blue-border text-winb-text-dark-blue font-semibold hover:bg-gray-200"
                    }`}
                    key={splitValue}
                  >
                    <input
                      type="checkbox"
                      id={`${filterKey}-${splitValue}`}
                      name={splitValue}
                      value={splitValue}
                      checked={
                        localSelectedFilters[filterKey]?.includes(splitValue) ||
                        false
                      }
                      className="hidden"
                      onChange={() => handleFilterSelect(filterKey, splitValue)}
                    />
                    {splitValue}
                  </label>
                );
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
