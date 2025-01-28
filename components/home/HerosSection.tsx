/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

type searchType = {
  makers: any[];
  models: any[];
};

function HeroSection() {
  const [searchData, setSearchData] = useState<searchType>();
  const [currentSelectedPrice, setCurrentSelectedPrice] = useState({
    min: 0,
    max: 1000,
  });
  const [currentSelectedMaker, setCurrentSelectedMaker] = useState<string>("");
  const [currentSelectedModel, setCurrentSelectedModel] = useState<string>("");
  const [toggle, setIsToggled] = useState(false);
  const [locationAlt, setLocationAlt] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const displayPriceRangers = () => {
    setIsToggled(!toggle);
  };

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

    if (currentSelectedPrice.max <= 1000) {
      queryParams.push(`maxPrice=${currentSelectedPrice.max}`);
    }

    const path = `/vehicleList${
      queryParams.length > 0 ? "?" + queryParams.join("&") : ""
    }`;

    router.push(path);
  };

  useEffect(() => {
    fetchSearchData();
  }, []);

  return (
    <div className="relative w-full min-h-[80vh] flex flex-col md:px-12 xl:px-56 mx-auto bg-hero-image pb-10 bg-cover object-center bg-center">
      <Navbar />
      <div className="flex flex-col justify-center py-14 lg:py-56 items-center h-full flex-1 px-4">
        <h1 className="font-bold text-3xl sm:text-5xl lg:text-4xl md:text-6xl text-white text-center mb-10 lg:mb-20">
          {locale === "en"
            ? "Reliable Vehicle Marketplace"
            : "信頼できる車両マーケットプレイス。"}
        </h1>
        <div className="flex  flex-col md:flex-row flex-wrap md:flex-nowrap items-center md:items-end justify-between bg-white max-w-[1070px] w-full rounded-2xl min-w-80 p-4 gap-4 text-[#1f1f1f] font-semibold text-lg">
          <div className="flex flex-col items-start flex-1 w-full">
            <label htmlFor="makers" className="text-sm mb-2">
              {locale === "en" ? "Makers" : "メーカー"}
            </label>
            <select
              name="makers"
              id="makers"
              onChange={(e) => setCurrentSelectedMaker(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">
                {locale === "en" ? "All Makers" : "すべてのメーカー"}
              </option>
              {searchData && searchData.makers.length > 0 ? (
                searchData.makers.map((maker, index) => {
                  const makerParts = maker.split(",");
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
          <div className="flex flex-col items-start flex-1 w-full">
            <label htmlFor="models" className="text-sm mb-2">
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
                  const modelParts = model.split(",")
                  return (
                    <option value={model} key={index}>
                    {locale === "en"
                        ? modelParts[0]
                        : modelParts[1]?.length > 0
                        ? modelParts[1]
                        : modelParts[0]}
                    </option>
                  )
                })
              ) : (
                <option value="">
                  {locale == "en" ? "No available makers" : "すべてのモデル"}
                </option>
              )}
            </select>
          </div>
          <div className="flex flex-col items-start flex-1 relative  justify-between min-w-40 w-full">
            <label htmlFor="models" className="text-sm mb-2">
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
                    {locale == "en" ? "Min" : "最小 "}{" "}
                  </label>
                  <input
                    type="range"
                    name="min"
                    id="min"
                    min={0}
                    max={999}
                    defaultValue={currentSelectedPrice.min}
                    className="w-full"
                    onChange={(e) => {
                      handlePriceChange("min", Number(e.target.value));
                    }}
                  />
                  <small className="font-normal">
                    {currentSelectedPrice.min}
                  </small>
                  <small> ¥</small>
                </div>
                <div className="w-full flex justify-between gap-1 items-center border border-gray-300 rounded-md p-2 text-lg font-light">
                  <label htmlFor="max" className="font-semibold">
                    {locale == "en" ? "Max" : " 最大 "}{" "}
                  </label>
                  <input
                    type="range"
                    name="max"
                    id="max"
                    min={0}
                    max={999}
                    defaultValue={currentSelectedPrice.max}
                    className="w-full"
                    onChange={(e) => {
                      handlePriceChange("max", Number(e.target.value));
                    }}
                  />
                  <small className="font-normal">
                    {currentSelectedPrice.max}{" "}
                  </small>
                  <small>¥</small>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="rounded-md md:max-w-32 w-full bg-[#FCDB02] text-black font-bold px-6 py-2 h-12"
            onClick={redirectToSearchResultPage}
          >
            {locale === "en" ? "Search" : "検索"}
          </button>
        </div>
      </div>

      <button
        onMouseEnter={displaylocationAlt}
        onMouseLeave={displaylocationAlt}
        onTouchStart={displaylocationAlt}
        onTouchEnd={displaylocationAlt}
        className=" gap-2 font-bold text-black text-sm flex items-center justify-center rounded-lg md:bg-white md:w-44 min-h-14 h-14 absolute bottom-2 right-5 "
      >
        <MapPin
          size={20}
          className="size-10 text-white cursor-pointer md:size-auto md:text-black "
        />{" "}
        <p className="hidden md:block">
          {locale === "en" ? "view on map" : "地図で表示"}
        </p>
        {locationAlt && (
          <div className="absolute min-w-[120px] -top-8 underline text-[#8f8f8f] py-1 px-2 rounded-md text-[12px] bg-[#0000006b] right-10">
            <Link href={"https://www.vihanga.site"}>
              {locale === "en"
                ? "click to follow the link"
                : "リンクをクリック"}
            </Link>
          </div>
        )}
      </button>
    </div>
  );
}

export default HeroSection;
