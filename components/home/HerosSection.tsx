"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { ChevronDown, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

type SearchType = {
  makers: string[];
  models: string[];
};

function HeroSection() {
  const [searchData, setSearchData] = useState<SearchType>();
  const [currentSelectedPrice, setCurrentSelectedPrice] = useState({
    min: 5000,
    max: 20000,
  });
  const [currentSelectedMaker, setCurrentSelectedMaker] = useState<string>("");
  const [currentSelectedModel, setCurrentSelectedModel] = useState<string>("");
  const [toggle, setToggle] = useState(false);
  const [locationAlt, setLocationAlt] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [clicked, setClicked] = useState(false)

  // Function to toggle price dropdown visibility
  const displayPriceRangers = () => {
    setToggle(!toggle);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handlePriceChange = (type: "min" | "max", value: number) => {
    setCurrentSelectedPrice((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const displaylocationAlt = () => {
    setLocationAlt(!locationAlt);
  };

  const fetchSearchData = async () => {
    try {
      const res = await axios.get("api/searchData/");
      if (res.status === 200) {
        setSearchData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToSearchResultPage = () => {
    setClicked(true)
    const queryParams = [];

    if (currentSelectedMaker !== "") {
      queryParams.push(`maker=${currentSelectedMaker}`);
    }

    if (currentSelectedModel !== "") {
      queryParams.push(`model=${currentSelectedModel}`);
    }

    if (currentSelectedPrice.min >= 0) {
      queryParams.push(`minPrice=${currentSelectedPrice.min}`);
    }

    if (currentSelectedPrice.max <= 50000) {
      queryParams.push(`maxPrice=${currentSelectedPrice.max}`);
    }

    const path = `/vehicleList${
      queryParams.length > 0 ? "?" + queryParams.join("&") : ""
    }`;

    router.push(path);
    setClicked(false)
  };

  useEffect(() => {
    fetchSearchData();
  }, []);

  return (
    <div className="relative w-full min-h-[80vh] flex flex-col md:px-12 xl:px-56 mx-auto bg-hero-image pb-10 bg-cover object-center bg-center max-h-[768px]">
      <Navbar />
      <div className="flex flex-col justify-start py-14  items-center px-4">
        <h1 className="font-bold text-3xl sm:text-5xl lg:text-6xl md:text-6xl text-white text-center mb-10 lg:mb-20">
          {locale === "en"
            ? "Reliable Vehicle Marketplace"
            : "信頼できる車両マーケットプレイス。"}
        </h1>

        <div className="flex  flex-col md:flex-row flex-wrap md:flex-nowrap items-center md:items-end justify-between bg-white max-w-[1070px] w-full rounded-2xl min-w-80 p-4 gap-4 text-[#1f1f1f] font-semibold text-lg">
          <div className="flex flex-col items-start flex-1 w-full">
            <label htmlFor="makers" className="text-xl mb-2">
              {locale === "en" ? "Makers" : "メーカー"}
            </label>
            <select
              name="makers"
              id="makers"
              onChange={(e) => setCurrentSelectedMaker(e.target.value)}
              className=" w-full  border border-gray-300 rounded-md px-3 py-2  "
            >
              <option value=""  className="text-sm">
                {locale === "en" ? "All Makers" : "すべてのメーカー"}
              </option>
              {searchData && searchData.makers.length > 0 ? (
                searchData.makers.map((maker, index) => {
                  const makerParts = maker.split("/");
                  return (
                    <option value={maker} key={index}>
                      {locale === "en"
                        ? makerParts[0]
                        : makerParts[1]?.length > 0
                        ? makerParts[1]
                        : makerParts[0]}
                    </option>
                  );
                })
              ) : (
                <option value="">
                  {locale === "en"
                    ? "No available makers"
                    : "利用可能なメーカーはありません"}
                </option>
              )}
            </select>
          </div>

          {/* Models Dropdown */}
          <div className="flex flex-col items-start flex-1 w-full">
            <label htmlFor="models" className="text-xl mb-2">
              {locale === "en" ? "Models" : "モデル"}
            </label>
            <select
              name="models"
              id="models"
              onChange={(e) => setCurrentSelectedModel(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">
                {locale == "en"
                  ? "All Models"
                  : "利用可能なメーカーはありません"}
              </option>
              {searchData && searchData.models.length > 0 ? (
                searchData.models.map((model, index) => {
                  const modelParts = model.split("/");
                  return (
                    <option value={model} key={index}>
                      {locale === "en"
                        ? modelParts[0]
                        : modelParts[1]?.length > 0
                        ? modelParts[1]
                        : modelParts[0]}
                    </option>
                  );
                })
              ) : (
                <option value="">
                  {locale == "en" ? "No available makers" : "すべてのモデル"}
                </option>
              )}
            </select>
          </div>

          {/* Price Selection */}
          <div
            className="flex flex-col items-start flex-1 relative justify-between min-w-40 w-full"
            ref={dropdownRef}
          >
            <label htmlFor="models" className="text-xl mb-2">
              {locale === "en" ? "Price" : "価格"}
            </label>
            <button
              type="button"
              onClick={displayPriceRangers}
              className="flex items-center cursor-default justify-between pl-2 min-h-[45px] border border-gray-300 rounded-md w-full"
            >
              {locale == "en" ? "Select Price" : "価格を選択"}{" "}
              <ChevronDown size={20} className="font-extrabold pr-1" />
            </button>
            {toggle && (
              <div className="w-64 shadow-md border flex flex-col items-center justify-start border-gray-300 h-auto py-4 px-3 bg-white rounded-md min-h-36 absolute top-20 left-0 right-0 gap-4">
                <div className="w-full flex justify-between gap-1 items-center border border-gray-300 rounded-md p-2 text-lg font-light">
                  <label htmlFor="min" className="font-semibold">
                    {locale == "en" ? "Min" : "最小 "}
                  </label>
                  <input
                    type="range"
                    name="min"
                    id="min"
                    min={500}
                    max={50000}
                    defaultValue={currentSelectedPrice.min}
                    className="w-full"
                    onChange={(e) =>
                      handlePriceChange("min", Number(e.target.value))
                    }
                  />
                  <small className="font-normal">
                    {currentSelectedPrice.min}
                  </small>
                  <small> ¥</small>
                </div>
                <div className="w-full flex justify-between gap-1 items-center border border-gray-300 rounded-md p-2 text-lg font-light">
                  <label htmlFor="max" className="font-semibold">
                    {locale == "en" ? "Max" : " 最大 "}
                  </label>
                  <input
                    type="range"
                    name="max"
                    id="max"
                    min={500}
                    max={50000}
                    defaultValue={currentSelectedPrice.max}
                    className="w-full"
                    onChange={(e) =>
                      handlePriceChange("max", Number(e.target.value))
                    }
                  />
                  <small className="font-normal">
                    {currentSelectedPrice.max}
                  </small>
                  <small>¥</small>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="button"
            className="rounded-md md:max-w-32 w-[150px] bg-[#FCDB02] text-black font-bold px-6 py-2 h-12"
            onClick={redirectToSearchResultPage}
          >
            {clicked ? locale === "en" ? "Search" : "検索" : locale === "en" ? "Search" : "検索検"}
          </button>
        </div>
      </div>

      <button
        onMouseEnter={displaylocationAlt}
        onMouseLeave={displaylocationAlt}
        onTouchStart={displaylocationAlt}
        onTouchEnd={displaylocationAlt}
        onClick={() =>
          window.open(
            "https://maps.app.goo.gl/iwuc6WUC8JdKwV2J6?g_st=iw",
            "_blank"
          )
        }
        className="gap-2 font-bold text-black text-sm flex items-center justify-center rounded-lg md:bg-white md:w-44 min-h-14 h-14 absolute bottom-2 right-5 hover:bg-slate-400"
      >
        <MapPin
          size={20}
          className="size-10 text-black cursor-pointer md:size-auto md:text-black"
        />
        <p className="hidden md:block">
          {locale === "en" ? "View on map" : "地図で表示"}
        </p>
      </button>
    </div>
  );
}

export default HeroSection;
