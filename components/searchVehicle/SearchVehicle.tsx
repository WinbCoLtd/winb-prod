 import React from 'react'

 function SearchVehicle() {


  
  const vehicles = [
    {
      id: 1,
      name: "Vehicle#1",
      description: "A reliable and fuel-efficient sedan perfect for daily commuting. Well-maintained with a clean interior and exterior.",
      imageUrl: "/cardvehicle.png",
      fuelType: "Petrol",
      driveType: "AWD",
      condition: "New",
     
    },
    {
      id: 2,
      name: "Vehicle#2",
      description: "A spacious SUV with advanced safety features. Great for family trips and off-road adventures.",
      imageUrl: "/cardvehicle.png",
      fuelType: "Diesel",
      driveType: "FWD",
      condition: "Used",
  
    },
    {
      id: 3,
      name: "Vehicle#3",
      description: "A luxury sports car with a sleek design and high performance for driving enthusiasts.",
      imageUrl: "/cardvehicle.png",
      fuelType: "Electric",
      driveType: "AWD",
      condition: "Used",
     
    },
    // Add more vehicles as needed
  ];
   return (
  
<div className="w-full md:w-[787px] ml-0 md:ml-[30px] ">
  {/* Search Input */}
  <div className="w-full md:w-[337px] h-[43px] mx-auto md:ml-[436px] p-4 flex items-center rounded-[50px] border-2 ">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-black mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
        clipRule="evenodd"
      />
    </svg>
    <input
      type="text"
      placeholder="Search Your Vehicle in mind"
      className="lg:text-[15px] text-black w-full px-4 py-2 focus:outline-none rounded-lg"
    />
  </div>

  {/* Card Section */}
  <div>
    {vehicles.map((vehicle) => (
      <div
        key={vehicle.id}
        className="w-full h-auto md:h-[275px] mt-4 p-4 md:pl-[38px] bg-white shadow-lg flex flex-col md:flex-row items-center md:items-start border border-winb-ashborder rounded-[15px]"
      >
        {/* Left Side - Image */}
        <div className="w-full md:w-[306px] h-[230px]">
          <img
            src={vehicle.imageUrl}
            alt={vehicle.name}
            className="w-full h-full object-cover border border-winb-ashborder rounded-[15px]"
          />
        </div>

        {/* Right Side - Descriptions */}
        <div className="w-full md:w-2/3 md:pl-4 mt-4 md:mt-0">
          <div>
            <h2 className="text-lg md:text-[24px] font-bold text-black">{vehicle.name}</h2>
          </div>
          <p className="text-sm md:text-[13px] font-medium text-gray-600 mt-[22px]">
            {vehicle.description}
          </p>

          {/* First Row: Icons and Titles */}
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 text-sm text-gray-600 font-semibold">
            <div className="flex items-center">
              <img src="/vehicleDetails/fuel-icon.png" alt="Fuel" className="w-4 h-4 mr-2" />
              <span>Fuel Type</span>
            </div>
            <div className="flex items-center">
              <img src="/vehicleDetails/drive-icon.png" alt="Drive Type" className="w-4 h-4 mr-2" />
              <span>Drive Type</span>
            </div>
            <div className="flex items-center">
              <img src="/vehicleDetails/condition-icon.png" alt="Condition" className="w-4 h-4 mr-2" />
              <span>Condition</span>
            </div>
          </div>

          {/* Second Row: Answers */}
          <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4 text-sm text-gray-600 font-semibold">
            <div className="flex items-center">
              <span>{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center">
              <span>{vehicle.driveType}</span>
            </div>
            <div className="flex items-center">
              <span>{vehicle.condition}</span>
            </div>
          </div>

          {/* More Details Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => alert(`Showing more details for ${vehicle.name}`)}
              className="bg-winb-yellow text-sm md:text-[15px] text-black font-medium px-4 py-2 rounded-[25px] hover:bg-yellow-300 transition duration-300"
            >
              More Details
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

    
 



    
   );
 }

 export default SearchVehicle;



// import React from "react";

// function SearchVehicle() {
//   const vehicles = [
//     {
//       id: 1,
//       name: "Vehicle#1",
//       description: "A reliable and fuel-efficient sedan perfect for daily commuting. Well-maintained with a clean interior and exterior.",
//       imageUrl: "/cardvehicle.png",
//       fuelType: "Petrol",
//       driveType: "AWD",
//       condition: "New",
//     },
//     {
//       id: 2,
//       name: "Vehicle#2",
//       description: "A spacious SUV with advanced safety features. Great for family trips and off-road adventures.",
//       imageUrl: "/cardvehicle.png",
//       fuelType: "Diesel",
//       driveType: "FWD",
//       condition: "Used",
//     },
//     {
//       id: 3,
//       name: "Vehicle#3",
//       description: "A luxury sports car with a sleek design and high performance for driving enthusiasts.",
//       imageUrl: "/cardvehicle.png",
//       fuelType: "Electric",
//       driveType: "AWD",
//       condition: "Used",
//     },
//   ];

//   return (
//     <div className="w-full px-4 md:w-[787px] mx-auto">
//       {/* Search Input */}
//       <div className="w-full max-w-md h-[43px] mx-auto p-2 flex items-center rounded-full border-2 shadow-sm">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 text-black mr-2"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//         >
//           <path
//             fillRule="evenodd"
//             d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.387a1 1 0 01-1.414 1.414l-3.387-3.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
//             clipRule="evenodd"
//           />
//         </svg>
//         <input
//           type="text"
//           placeholder="Search Your Vehicle in mind"
//           className="text-sm text-black w-full px-4 py-2 focus:outline-none rounded-full"
//         />
//       </div>

//       {/* Card Section */}
//       <div className="mt-6 space-y-6">
//         {vehicles.map((vehicle) => (
//           <div
//             key={vehicle.id}
//             className="w-full flex flex-col md:flex-row items-center bg-white shadow-lg border border-gray-300 rounded-lg p-4"
//           >
//             {/* Left Side - Image */}
//             <div className="w-full md:w-[40%] h-[200px] md:h-[230px] flex-shrink-0">
//               <img
//                 src={vehicle.imageUrl}
//                 alt={vehicle.name}
//                 className="w-full h-full object-cover rounded-lg border"
//               />
//             </div>

//             {/* Right Side - Descriptions */}
//             <div className="w-full md:w-[60%] md:pl-4 mt-4 md:mt-0 flex flex-col justify-between">
//               <h2 className="text-lg font-bold text-black">{vehicle.name}</h2>
//               <p className="text-sm text-gray-600 mt-2">{vehicle.description}</p>

//               {/* Icon Section */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
//                 <div className="flex items-center">
//                   <img
//                     src="/vehicleDetails/fuel-icon.png"
//                     alt="Fuel Type"
//                     className="w-4 h-4 mr-2"
//                   />
//                   <span className="text-sm text-gray-600">Fuel Type</span>
//                 </div>
//                 <div className="flex items-center">
//                   <img
//                     src="/vehicleDetails/drive-icon.png"
//                     alt="Drive Type"
//                     className="w-4 h-4 mr-2"
//                   />
//                   <span className="text-sm text-gray-600">Drive Type</span>
//                 </div>
//                 <div className="flex items-center">
//                   <img
//                     src="/vehicleDetails/condition-icon.png"
//                     alt="Condition"
//                     className="w-4 h-4 mr-2"
//                   />
//                   <span className="text-sm text-gray-600">Condition</span>
//                 </div>
//               </div>

//               {/* Details Section */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 text-gray-700 font-medium">
//                 <span>{vehicle.fuelType}</span>
//                 <span>{vehicle.driveType}</span>
//                 <span>{vehicle.condition}</span>
//               </div>

//               {/* More Details Button */}
//               <div className="mt-4">
//                 <button
//                   onClick={() => alert(`Showing more details for ${vehicle.name}`)}
//                   className="bg-yellow-400 text-sm text-black font-medium px-4 py-2 rounded-full hover:bg-yellow-500 transition duration-300"
//                 >
//                   More Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SearchVehicle;
