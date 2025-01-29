/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Filterbar from "@/components/vehicleCard/filterbar";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import VehicleSection from "@/components/vehicleCard/vehicleSection";
import { useSearchParams } from "next/navigation";

// LibreTranslate API URL
const LIBRE_TRANSLATE_URL = "https://libretranslate.de/translate";

// Fetch Filters Function
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
          .filter(
            (year: string, index: number, self: string[]) =>
              self.indexOf(year) === index
          );
      } else {
        formattedFilters[key] = data[key].map(
          (item: any) => Object.values(item)[0]
        );
      }
    }

    return formattedFilters;
  } catch (error) {
    console.error("Error fetching filters:", error);
    return {};
  }
}

// Fetch Vehicles Function
async function getVehicles(filters: any, search: string, currentPage: number) {
  try {
    const query = `/api/vehicles?search=${encodeURIComponent(
      search
    )}&filters=${encodeURIComponent(
      JSON.stringify(filters)
    )}&currentPage=${currentPage}`;
    console.log("API Query:", query);

    const res = await axios.get(query);
    return res.data;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return null;
  }
}

// Translate Text Function
async function translateText(text: string, sourceLang: string, targetLang: string) {
  try {
    const res = await axios.post(LIBRE_TRANSLATE_URL, {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: "text",
    });

    return res.data.translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    return text; // Return original text on failure
  }
}

// Main Details Component
function Details() {
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});
  const [search, setSearch] = useState("");
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLang, setCurrentLang] = useState<"en" | "ja">("en"); // Language state
  const searchParams = useSearchParams();

  const fetchVehicles = async (
    filters: any,
    search: string,
    currentPage: number
  ) => {
    setLoading(true);
    const data = await getVehicles(filters, search, currentPage);
    if (data) {
      setVehicles(data.vehicles || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    const initializeData = async () => {
      const filtersData = await getFilters();
      setFilters(filtersData);

      const searchQuery = searchParams.get("search") || "";
      const queryFilters: any = {};

      if (searchParams.get("maker")) {
        queryFilters.maker = searchParams.getAll("maker");
      }
      if (searchParams.get("model")) {
        queryFilters.model = searchParams.getAll("model");
      }
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      if (minPrice || maxPrice) {
        queryFilters.price = [minPrice, maxPrice]
          .filter(Boolean)
          .map((value) => Number(value)); // Convert to numbers
      }

      // Fetch vehicles with proper queryFilters
      await fetchVehicles(queryFilters, searchQuery, 1);
    };

    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = async (newFilters: any) => {
    // Update vehicles when filters are changed
    setSelectedFilters(newFilters);
    await fetchVehicles(newFilters, search, 1);
  };

  const handleSearchChange = async (newSearch: any) => {
    // Update vehicles when filters are changed
    setSearch(newSearch);
    await fetchVehicles(selectedFilters, newSearch, 1);
  };

  const handleLanguageToggle = async () => {
    const newLang = currentLang === "en" ? "ja" : "en";
    const allTextElements = document.querySelectorAll("[data-translate]");

    for (const element of allTextElements) {
      const text = element.textContent || "";
      const translatedText = await translateText(text, currentLang, newLang);
      element.textContent = translatedText;
    }

   
    setCurrentLang(newLang);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PulseLoader color="#2563eb" size={20} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-start max-w-[1366px] mx-auto px-4 py-2">
      <div className="bg-[#08001C67] w-full flex items-center justify-center border border-[#00CCEE] rounded-[10px] min-h-32 my-auto">
        <Navbar />
      
      </div>
      <div className="mt-[36px] mb-5 flex gap-3 min-h-[768px]">
        <div className="hidden lg:block">
          <Filterbar
            filters={filters}
            onApplyFilters={handleFilterChange}
            initialSelectedFilters={selectedFilters}
          />
        </div>
        <VehicleSection
          vehicles={vehicles}
          onSearchChange={handleSearchChange}
          filters={filters}
          onApplyFilters={handleFilterChange}
          initialSelectedFilters={selectedFilters}
        />
      </div>
    </div>
  );
}

export default Details;
