import React from "react";

function HerosSection() {
  return (
    <div className="relative w-full flex flex-col max-w-[1166px] mx-auto">

      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <h1 className="relative z-10 mt-20 lg:mt-16 md:mt-12 sm:mt-10 text-white font-semibold text-[64px] lg:text-[52px] md:text-[44px] sm:text-[36px] xxs:text-[24px] leading-tight text-center transition-transform duration-300 ease-in-out hover:scale-105">
        Your Trusted Vehicle Marketplace
      </h1>

  
      <div className="max-w-[1166px] w-full mx-auto h-[500px] lg:h-[400px] md:h-[350px] sm:h-[300px] xxs:h-[200px] relative z-10 bg-gray-300">
      </div>

      {/* Filters Section */}
      <div className="absolute mt-[240px] lg:mt-[200px] md:mt-[180px] sm:mt-[150px] xxs:mt-[120px] left-0 w-full px-4 flex justify-center items-center">
      <div
        className="
          bg-white 
          p-4 
          rounded-lg 
          w-full 
          max-w-[770px] 
          flex 
          flex-col 
          sm:flex-row 
          items-center 
          justify-between 
          gap-4
          shadow-lg
          relative z-20
        "
      >
        <select className="border p-2 rounded-md w-full sm:w-[30%] text-gray-700 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[16px]">
          <option value="">All Marks</option>
          <option value="ford">Ford</option>
          <option value="chevy">Chevrolet</option>
          <option value="toyota">Toyota</option>
          <option value="bmw">BMW</option>
        </select>

        <select className="border p-2 rounded-md w-full sm:w-[30%] text-gray-700 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[16px]">
          <option value="">All Models</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="truck">Truck</option>
        </select>

        <select className="border p-2 rounded-md w-full sm:w-[30%] text-gray-700 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[16px]">
          <option value="">Pricing</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>

        <button className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[16px] bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 w-full sm:w-auto sm:h-[45px]">
          Search
        </button>
      </div>
    </div>


      {/* "View on the Map" Button */}
      <button className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[176px] lg:w-[150px] md:w-[120px] sm:w-[100px] xxs:w-[90px] h-[54px] sm:h-[45px] xxs:h-[40px] bg-white text-black rounded-md hover:bg-gray-200 flex items-center justify-center space-x-2 shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[20px] h-[20px] sm:w-[18px] sm:h-[18px]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2C8.134 2 5 5.134 5 9c0 3.6 3 6.64 7.24 12.5L12 21l.76-1.5C16 15.64 19 12.6 19 9c0-3.866-3.134-7-7-7z" />
        </svg>
        <span className="text-sm sm:text-[11px] xxs:text-[9px]">
          View on the Map
        </span>
      </button>
    </div>
    
  );
}

export default HerosSection;









