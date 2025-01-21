/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";

type searchType = {
  makers: any[];
  models: any[];
};

function HerosSection() {
  const [searchData, setSearchData] = useState<searchType>();
  const [currentSelectedPrice, setCurrentSelectedPrice] = useState({
    min: 300,
    max: 1000,
  });
  const [currentSelectedMaker, setCurrentSelectedMaker] = useState<string>("");
  const [currentSelectedModel, setCurrentSelectedModel] = useState<string>("");
  const [toggle, setIsToggled] = useState(false);
  const [locationAlt, setLocationAlt] = useState(false);

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
    const path = `/search?maker=${currentSelectedMaker}&model=${currentSelectedModel}&minPrice=${currentSelectedPrice.min}&maxPrice=${currentSelectedPrice.max}`;
    console.log("Redirecting to:", path);
    // Use router.push(path) if you're using Next.js routing
  };

  useEffect(() => {
    fetchSearchData();
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col md:px-32 xl:px-56 mx-auto bg-hero-image pb-10 bg-cover object-center bg-center aspect-video">
      <Navbar />
      <div className="flex flex-col justify-center py-10 lg:py-56 items-center h-full px-4">
        <h1 className="font-bold text-3xl sm:text-5xl lg:text-4xl md:text-6xl text-white text-center mb-10 lg:mb-20">
          信頼できる車両マーケットプレイス。
        </h1>
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-between bg-white max-w-[770px] w-full rounded-2xl min-w-80 p-4 gap-4 text-[#1f1f1f] font-semibold text-lg">
          <div className="flex flex-col items-start flex-1 w-full">
            <label htmlFor="makers" className="text-sm mb-2">
              Makers
            </label>
            <select
              name="makers"
              id="makers"
              onChange={(e) => setCurrentSelectedMaker(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All Makers</option>
              {searchData ? (
                searchData.makers.map((maker, index) => (
                  <option value={maker.name} key={index}>
                    {maker.name}
                  </option>
                ))
              ) : (
                <option value="">No available makers</option>
              )}
            </select>
          </div>
          <div className="flex flex-col items-start flex-1 w-full">
            <label htmlFor="models" className="text-sm mb-2">
              Models
            </label>
            <select
              name="models"
              id="models"
              onChange={(e) => setCurrentSelectedModel(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">All Models</option>
              {searchData ? (
                searchData.models.map((model, index) => (
                  <option value={model.name} key={index}>
                    {model.name}
                  </option>
                ))
              ) : (
                <option value="">No available models</option>
              )}
            </select>
          </div>
          <div className="flex flex-col items-start flex-1 relative  justify-between min-w-40 w-full">
            <label htmlFor="models" className="text-sm mb-2">
              Price
            </label>
            <button
              type="button"
              onClick={displayPriceRangers}
              className="flex items-center cursor-default justify-between pl-2 min-h-[45px] border border-gray-300 rounded-md w-full"
            >
              Select Price{" "}
              <ChevronDown size={20} className="font-extrabold pr-1" />
            </button>
            {toggle && (
              <div className="w-64 shadow-md border flex flex-col items-center justify-start border-gray-300 h-auto py-4 px-3 bg-white rounded-md min-h-36 absolute top-20 left-0 right-0 gap-4">
                <div className="w-full flex justify-between gap-1 items-center border border-gray-300 rounded-md p-2 text-lg font-light">
                  <label htmlFor="min" className="font-semibold">
                    Min{" "}
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
                    Max{" "}
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
            className="rounded-md w-full bg-[#FCDB02] text-black font-bold px-6 py-2 h-12"
            onClick={redirectToSearchResultPage}
          >
            Search
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
        <p className="hidden md:block">View on the map</p>
        {locationAlt && (
          <div className="absolute min-w-[120px] -top-8 underline text-[#8f8f8f] py-1 px-2 rounded-md text-[12px] bg-[#0000006b] right-10">
            <Link href={"https://www.vihanga.site"}>
              click to follow the link
            </Link>
          </div>
        )}
      </button>
    </div>
  );
}

export default HerosSection;
