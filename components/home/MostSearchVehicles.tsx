/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import { useLocale } from "next-intl";

function MostHeroSection() {
  const [types, setTypes] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [vehicles, setVehicles] = useState([]);
  const locale = useLocale();

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(
        `api/vehicles/latestVehicles?category=${selectedType}`
      );
      if (res.status === 200) {
        setVehicles(res.data);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`api/vehicles/categories`);
      if (res.status === 200) {
        setTypes(res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchVehicles();
    console.log(vehicles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);
  //   {type.vehicleType}

  return (
    <section className="max-w-winb-max-1366 w-full mx-auto pt-16 pb-6 px-6 space-y-2">
      <h2 className="text-4xl font-semibold text-black">The Most Searched</h2>
      <h2 className="text-2xl font-medium text-black">最も検索された</h2>

      <div className="space-x-4">
        <button
          onClick={() => handleTypeChange("all")}
          className={`text-[18px] text-[#00000057] font-medium hover:underline capitalize ${
            selectedType === "all" ? "underline" : ""
          }
              ${selectedType === "all" ? "underline" : ""}`}
        >
            {locale === "en" ? "All" : "全て"}
        </button>
        {types.length > 0 ? (
          types.map((type, index) => {
            const typeParts = type.vehicleType.split("/"); // Split once and store the parts
            const displayText =
              locale === "en"
                ? typeParts[0] // English: Show the first part
                : typeParts[1]?.length > 0 // Non-English: Show the second part if it's non-empty
                ? typeParts[1]
                : typeParts[0];

            return (
              <button
                key={index}
                onClick={() => handleTypeChange(type.vehicleType)}
                className={`text-[18px] text-[#00000057] font-medium hover:underline capitalize ${
                  selectedType === type.vehicleType ? "underline" : ""
                }`}
              >
                {displayText}
              </button>
            );
          })
        ) : (
          <p>Loading categories...</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <Card key={index} vehicle={vehicle} />
          ))
        ) : (
          <p>No vehicles available for {selectedType}</p>
        )}
      </div>
    </section>
  );
}

export default MostHeroSection;
