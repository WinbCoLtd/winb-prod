// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar";
// import axios from "axios";
// import { ChevronDown, MapPin } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// type searchType = {
//   makers: any[];
//   models: any[];
// };

// function HerosSection() {
//   const [searchData, setSearchData] = useState<searchType>();
//   const [currentSelectedPrice, setCurrentSelectedPrice] = useState({
//     min: 0,
//     max: 1000,
//   });
//   const [currentSelectedMaker, setCurrentSelectedMaker] = useState<string>("");
//   const [currentSelectedModel, setCurrentSelectedModel] = useState<string>("");
//   const [toggle, setIsToggled] = useState(false);
//   const [locationAlt, setLocationAlt] = useState(false);
//   const router = useRouter()

//   const displayPriceRangers = () => {
//     setIsToggled(!toggle);
//   };

//   const handlePriceChange = (type: "min" | "max", value: number) => {
//     setCurrentSelectedPrice((prev) => ({
//       ...prev,
//       [type]: value,
//     }));
//   };

//   const displaylocationAlt = () => {
//     setLocationAlt(!locationAlt);
//   };

//   const fetchSearchData = async () => {
//     try {
//       const res = await axios.get("api/searchData/");
//       if (res.status === 200) {
//         setSearchData(res.data);
//         console.log(searchData);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const redirectToSearchResultPage = () => {
//     const queryParams = [];
  
//     if (currentSelectedMaker !== "") {
//       queryParams.push(`maker=${currentSelectedMaker}`);
//     }
  
//     if (currentSelectedModel !== "") {
//       queryParams.push(`model=${currentSelectedModel}`);
//     }
  
//     if (currentSelectedPrice.min >= 0) {
//       queryParams.push(`minPrice=${currentSelectedPrice.min}`);
//     }
  
//     if (currentSelectedPrice.max <= 1000) {
//       queryParams.push(`maxPrice=${currentSelectedPrice.max}`);
//     }
  
//     const path = `/vehicleList${queryParams.length > 0 ? '?' + queryParams.join('&') : ''}`;
  
//     console.log("Redirecting to:", path);
//     router.push(path);
//   };
  

//   useEffect(() => {
//     fetchSearchData();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   //TODO: Add a loading spinner
//   //TODO: Add a fallback UI for when the data is not available
//   //TODO: Add a toast notification for when the search is successful
//   //TODO: Add a toast notification for when the search is unsuccessful
//   //TODO: Add custome styles select dropdowns
//   return (
//     <div className="relative w-full min-h-[80vh] flex flex-col md:px-12 xl:px-56 mx-auto bg-hero-image pb-10 bg-cover object-center bg-center">
//       <Navbar />
//       <div className="flex flex-col justify-center py-14 lg:py-56 items-center h-full flex-1 px-4">
//         <h1 className="font-bold text-3xl sm:text-5xl lg:text-4xl md:text-6xl text-white text-center mb-10 lg:mb-20">
//           信頼できる車両マーケットプレイス。
//         </h1>
//         <div className="flex  flex-col md:flex-row flex-wrap md:flex-nowrap items-center md:items-end justify-between bg-white max-w-[770px] w-full rounded-2xl min-w-80 p-4 gap-4 text-[#1f1f1f] font-semibold text-lg">
//           <div className="flex flex-col items-start flex-1 w-full">
//             <label htmlFor="makers" className="text-sm mb-2">
//               Makers
//             </label>
//             <select
//               name="makers"
//               id="makers"
//               onChange={(e) => setCurrentSelectedMaker(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option value="">All Makers</option>
//               {searchData ? (
//                 searchData.makers.map((maker, index) => (
//                   <option value={maker} key={index}>
//                     {maker}
//                   </option>
//                 ))
//               ) : (
//                 <option value="">No available makers</option>
//               )}
//             </select>
//           </div>
//           <div className="flex flex-col items-start flex-1 w-full">
//             <label htmlFor="models" className="text-sm mb-2">
//               Models
//             </label>
//             <select
//               name="models"
//               id="models"
//               onChange={(e) => setCurrentSelectedModel(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-3 py-2"
//             >
//               <option value="">All Models</option>
//               {searchData ? (
//                 searchData.models.map((model, index) => (
//                   <option value={model} key={index}>
//                     {model}
//                   </option>
//                 ))
//               ) : (
//                 <option value="">No available models</option>
//               )}
//             </select>
//           </div>
//           <div className="flex flex-col items-start flex-1 relative  justify-between min-w-40 w-full">
//             <label htmlFor="models" className="text-sm mb-2">
//               Price
//             </label>
//             <button
//               type="button"
//               onClick={displayPriceRangers}
//               className="flex items-center cursor-default justify-between pl-2 min-h-[45px] border border-gray-300 rounded-md w-full"
//             >
//               Select Price{" "}
//               <ChevronDown size={20} className="font-extrabold pr-1" />
//             </button>
//             {toggle && (
//               <div className="w-64 shadow-md border flex flex-col items-center justify-start border-gray-300 h-auto py-4 px-3 bg-white rounded-md min-h-36 absolute top-20 left-0 right-0 gap-4">
//                 <div className="w-full flex justify-between gap-1 items-center border border-gray-300 rounded-md p-2 text-lg font-light">
//                   <label htmlFor="min" className="font-semibold">
//                     Min{" "}
//                   </label>
//                   <input
//                     type="range"
//                     name="min"
//                     id="min"
//                     min={0}
//                     max={999}
//                     defaultValue={currentSelectedPrice.min}
//                     className="w-full"
//                     onChange={(e) => {
//                       handlePriceChange("min", Number(e.target.value));
//                     }}
//                   />
//                   <small className="font-normal">
//                     {currentSelectedPrice.min}
//                   </small>
//                   <small> ¥</small>
//                 </div>
//                 <div className="w-full flex justify-between gap-1 items-center border border-gray-300 rounded-md p-2 text-lg font-light">
//                   <label htmlFor="max" className="font-semibold">
//                     Max{" "}
//                   </label>
//                   <input
//                     type="range"
//                     name="max"
//                     id="max"
//                     min={0}
//                     max={999}
//                     defaultValue={currentSelectedPrice.max}
//                     className="w-full"
//                     onChange={(e) => {
//                       handlePriceChange("max", Number(e.target.value));
//                     }}
//                   />
//                   <small className="font-normal">
//                     {currentSelectedPrice.max}{" "}
//                   </small>
//                   <small>¥</small>
//                 </div>
//               </div>
//             )}
//           </div>

//           <button
//             type="button"
//             className="rounded-md md:max-w-32 w-full bg-[#FCDB02] text-black font-bold px-6 py-2 h-12"
//             onClick={redirectToSearchResultPage}
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       <button
//         onMouseEnter={displaylocationAlt}
//         onMouseLeave={displaylocationAlt}
//         onTouchStart={displaylocationAlt}
//         onTouchEnd={displaylocationAlt}
//         className=" gap-2 font-bold text-black text-sm flex items-center justify-center rounded-lg md:bg-white md:w-44 min-h-14 h-14 absolute bottom-2 right-5 "
//       >
//         <MapPin
//           size={20}
//           className="size-10 text-white cursor-pointer md:size-auto md:text-black "
//         />{" "}
//         <p className="hidden md:block">View on the map</p>
//         {locationAlt && (
//           <div className="absolute min-w-[120px] -top-8 underline text-[#8f8f8f] py-1 px-2 rounded-md text-[12px] bg-[#0000006b] right-10">
//             <Link href={"https://www.vihanga.site"}>
//               click to follow the link
//             </Link>
//           </div>
//         )}
//       </button>
//     </div>
//   );
// }

// export default HerosSection;



'use client';

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SearchType = {
  makers: string[];
  models: string[];
};

function HerosSection() {
  const [searchData, setSearchData] = useState<SearchType | null>(null);
  const [currentSelectedPrice, setCurrentSelectedPrice] = useState({
    min: 300,
    max: 1000,
  });
  const [currentSelectedMaker, setCurrentSelectedMaker] = useState<string>("");
  const [currentSelectedModel, setCurrentSelectedModel] = useState<string>("");
  const [toggle, setToggle] = useState(false);
  const [locationAlt, setLocationAlt] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown container

  const displayPriceRangers = () => {
    setToggle(!toggle);
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    setCurrentSelectedPrice((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setToggle(false); // Close the dropdown if the click is outside
    }
  };

  const redirectToSearchResultPage = () => {
    const queryParams = new URLSearchParams();
    if (currentSelectedMaker) queryParams.append("maker", currentSelectedMaker);
    if (currentSelectedModel) queryParams.append("model", currentSelectedModel);
    if (currentSelectedPrice.min >= 0)
      queryParams.append("minPrice", currentSelectedPrice.min.toString());
    if (currentSelectedPrice.max > 0)
      queryParams.append("maxPrice", currentSelectedPrice.max.toString());

    const path = `/vehicleList?${queryParams.toString()}`;
    console.log("Redirecting to:", path);
    router.push(path);
  };

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const res = await axios.get("api/searchData/");
        if (res.status === 200) {
          setSearchData(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    };
    fetchSearchData();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full min-h-[80vh] flex flex-col md:px-12 xl:px-56 mx-auto bg-hero-image pb-10 bg-cover object-center bg-center">
      <Navbar />
      <div className="flex flex-col justify-center py-14 lg:py-56 items-center h-full flex-1 px-4">
        <h1 className="font-bold text-3xl lg:text-4xl md:text-4xl text-white text-center mb-10 lg:mb-20 relative -top-2">
          信頼に基づいて構築され、安全性を重視し、品質を完璧にします!
        </h1>

        <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center md:items-end justify-between bg-white max-w-[770px] w-full rounded-2xl min-w-80 p-4 gap-4 text-[#1f1f1f] font-semibold text-lg">
          {/* Makers Dropdown */}
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
                  <option value={maker} key={index}>
                    {maker}
                  </option>
                ))
              ) : (
                <option value="">No available makers</option>
              )}
            </select>
          </div>

          {/* Models Dropdown */}
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
                  <option value={model} key={index}>
                    {model}
                  </option>
                ))
              ) : (
                <option value="">No available models</option>
              )}
            </select>
          </div>

          {/* Price Selection */}
          <div className="flex flex-col items-start flex-1 relative justify-between min-w-40 w-full" ref={dropdownRef}>
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
            className="rounded-md md:max-w-32 w-full bg-[#FCDB02] text-black font-bold px-6 py-2 h-12"
            onClick={redirectToSearchResultPage}
          >
            Search
          </button>
        </div>
      </div>

      <Link
        href={"https://maps.app.goo.gl/iwuc6WUC8JdKwV2J6?g_st=iw"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          onMouseEnter={() => setLocationAlt(true)}
          onMouseLeave={() => setLocationAlt(false)}
          onTouchStart={() => setLocationAlt(true)}
          onTouchEnd={() => setLocationAlt(false)}
          className="gap-2 font-bold text-black text-sm flex items-center justify-center rounded-lg md:bg-white md:w-44 min-h-14 h-14 absolute bottom-2 right-5"
        >
          <MapPin
            size={20}
            className="size-10 text-white cursor-pointer md:size-auto md:text-black"
          />{" "}
          <p className="hidden md:block">View on the map</p>
        </button>
      </Link>
    </div>
  );
}

export default HerosSection;
