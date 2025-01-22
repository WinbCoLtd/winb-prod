/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

function MostHeroSection() {
  const [types, setTypes] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState<string>(types[0]?.vehicleType);
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`api/vehicles/latestVehicles?category=${selectedType}`);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  return (
    <section className="max-w-winb-max-1366 w-full mx-auto py-16 px-6 space-y-2">
      <h2 className="text-4xl font-semibold text-black">The Most Searched</h2>
      <h2 className="text-2xl font-medium text-black">最も検索された</h2>

      <div className="space-x-4">
        {types.length > 0 ? (
          types.map((type, index) => (
            <button
              key={index}
              onClick={() => handleTypeChange(type)}
              className={`text-[20px] text-[#6e6e6e] font-semibold hover:underline ${
                selectedType === type ? "underline" : ""
              }`}
            >
              {type.vehicleType}
            </button>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>

      <div className="flex flex-wrap justify-center space-x-4 items-center w-full h-auto">
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
