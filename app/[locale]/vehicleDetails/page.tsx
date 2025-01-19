


'use client'

import React from 'react';
 import SearchVehicle from '@/components/searchVehicle/SearchVehicle'
import {
  FaTruck,       // For Manufacture
  FaCar,         // For Model
  FaRegSnowflake, // For Condition
  FaCogs,        // For Drive Type
  FaGasPump,     // For Fuel Type
  FaStar         // For Features
} from 'react-icons/fa'; // Import icons from FontAwesome

function Details() {
  return (
    <div className="relative w-full flex flex-col  max-w-[1166px] mx-auto">
      <div className="mt-[23px] h-[127px] bg-winb-ash flex items-center justify-between px-4 md:px-8">Nav</div>

      <div className="mt-[36px] flex">
        {/* Column 1 */}
        <div className="w-full max-w-[341px] h-auto bg-white border border-black rounded-[15px] p-4">

{/* Manufacture */}
<div className="mb-6">
  <div className="flex items-center mb-2">
    <FaTruck className="w-[30px] h-[30px] text-gray-500 mr-[21px]" />
    <h3 className="lg:text-[15px] sm:text-[13px] xs:text-[12px] xxs:text-[12px] text-black font-semibold">Manufacture</h3>
  </div>
  
  <div className="grid lg:grid-cols-4 sm:grid-cols-4 xs:grid-cols-3 xxs:grid-cols-3 lg:text-[13px] sm:text-[13px] xs:text-[11px] xxs:text-[11px] gap-2 mt-[27px]">
    {['Toyota', 'Honda', 'Nissan', 'Ford', 'Toyota', 'Honda', 'Nissan', 'Ford'].map((brand, index) => (
      <button key={index} className="w-full sm:w-[68px] h-[25px] rounded-[25px] text-winb-text-dark-blue font-medium bg-white items-center border-2 border-winb-blue-border hover:bg-slate-50">
        {brand}
      </button>
    ))}
  </div>
</div>

{/* Model */}
<div className="mb-6">
  <div className="flex items-center mb-2 mt-[27px]">
    <FaCar className="w-[30px] h-[30px] text-gray-500 mr-[21px]" />
    <h3 className="lg:text-[15px] sm:text-[13px] xs:text-[12px] xxs:text-[12px] text-black font-semibold">Model</h3>
  </div>
  
  <div className="grid lg:grid-cols-4 sm:grid-cols-4 xs:grid-cols-3 xxs:grid-cols-3 lg:text-[13px] sm:text-[13px] xs:text-[11px] xxs:text-[11px] gap-2 mt-[27px]">
    {['RAV4', 'RAV4', 'RAV4', 'RAV4', 'RAV4', 'RAV4', 'RAV4'].map((model, index) => (
      <button key={index} className="w-full sm:w-[68px] h-[25px] rounded-[25px] text-winb-text-dark-blue font-medium bg-white items-center border-2 border-winb-blue-border hover:bg-slate-50">
        {model}
      </button>
    ))}
  </div>
</div>

{/* Condition */}
<div className="mb-6">
  <div className="flex items-center mb-2 mt-[27px]">
    <FaRegSnowflake className="w-[30px] h-[30px] text-gray-500 mr-[21px]" />
    <h3 className="lg:text-[15px] sm:text-[13px] xs:text-[12px] xxs:text-[12px] text-black font-semibold">Condition</h3>
  </div>
  
  <div className="grid lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-3 xxs:grid-cols-3 lg:text-[13px] sm:text-[13px] xs:text-[11px] xxs:text-[11px] gap-2 mt-[27px]">
    {['New', 'Used', 'CPO'].map((condition, index) => (
      <button key={index} className="w-full sm:w-[130px] h-[25px] rounded-[25px] text-winb-text-dark-blue font-medium bg-white items-center border-2 border-winb-blue-border hover:bg-slate-50">
        {condition}
      </button>
    ))}
  </div>
</div>

{/* Drive Type */}
<div className="mb-6">
  <div className="flex items-center mb-2 mt-[27px]">
    <FaCogs className="w-[30px] h-[30px] text-gray-500 mr-[21px]" />
    <h3 className="lg:text-[15px] sm:text-[13px] xs:text-[12px] xxs:text-[12px] text-black font-semibold">Drive Type</h3>
  </div>
  
  <div className="grid lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-3 xxs:grid-cols-3 lg:text-[13px] sm:text-[13px] xs:text-[11px] xxs:text-[11px] gap-2 mt-[27px]">
    {['FWD', 'RWD', 'AWD', '4WD'].map((driveType, index) => (
      <button key={index} className="w-full sm:w-[144px] h-[25px] rounded-[25px] text-winb-text-dark-blue font-medium bg-white items-center border-2 border-winb-blue-border hover:bg-slate-50">
        {driveType}
      </button>
    ))}
  </div>
</div>

{/* Fuel Type */}
<div className="mb-6">
  <div className="flex items-center mb-2 mt-[27px]">
    <FaGasPump className="w-[30px] h-[30px] text-gray-500 mr-[21px]" />
    <h3 className="lg:text-[15px] sm:text-[13px] xs:text-[12px] xxs:text-[12px] text-black font-semibold">Fuel Type</h3>
  </div>
  
  <div className="grid lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-3 xxs:grid-cols-3 lg:text-[13px] sm:text-[13px] xs:text-[11px] xxs:text-[11px] gap-2 mt-[27px]">
    {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map((fuel, index) => (
      <button key={index} className="w-full sm:w-[144px] h-[25px] rounded-[25px] text-winb-text-dark-blue font-medium bg-white items-center border-2 border-winb-blue-border hover:bg-slate-50">
        {fuel}
      </button>
    ))}
  </div>
</div>

{/* Features */}
<div className="mb-6">
  <div className="flex items-center mb-2 mt-[27px]">
    <FaStar className="w-[30px] h-[30px] mr-[21px] text-gray-500" />
    <h3 className="lg:text-[15px] sm:text-[13px] xs:text-[12px] xxs:text-[12px] text-black font-semibold">Features</h3>
  </div>
  
  <div className="grid lg:grid-cols-4 sm:grid-cols-4 xs:grid-cols-3 xxs:grid-cols-3 lg:text-[13px] sm:text-[13px] xs:text-[11px] xxs:text-[11px] gap-2 mt-[27px]">
    {['AC', 'AC', 'AC', 'AC', 'AC', 'AC'].map((feature, index) => (
      <button key={index} className="w-full sm:w-[68px] h-[25px] rounded-[25px] text-winb-text-dark-blue font-medium bg-white items-center border-2 border-winb-blue-border hover:bg-slate-50">
        {feature}
      </button>
    ))}
  </div>
</div>




</div>


  

 


<SearchVehicle/>

      </div>
     
      </div> 

      
     

 
    
  );
}

export default Details;




// 'use client'

// import React from 'react';
// import SearchVehicle from '@/components/searchVehicle/SearchVehicle'
// import {
//   FaTruck,
//   FaCar,
//   FaRegSnowflake,
//   FaCogs,
//   FaGasPump,
//   FaStar
// } from 'react-icons/fa';


// function Details() {
//   return (
//     <div className="relative w-full flex flex-col max-w-[1166px] mx-auto">
//       <div className="mt-6 h-[127px] bg-winb-ash flex items-center justify-between px-4 md:px-8">Nav</div>

//       <div className="mt-9 flex flex-col lg:flex-row gap-6">
//         {/* Column 1 */}
//         <div className="w-full lg:max-w-[341px] bg-white border border-black rounded-[15px] p-4 flex-shrink-0">
//           {/* Manufacture */}
//           <div className="mb-6">
//             <div className="flex items-center mb-2">
//               <FaTruck className="w-6 h-6 text-gray-500 mr-4" />
//               <h3 className="text-base font-semibold text-black">Manufacture</h3>
//             </div>
//             <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2 mt-4">
//               {['Toyota', 'Honda', 'Nissan', 'Ford', 'Toyota', 'Honda', 'Nissan', 'Ford'].map((brand, index) => (
//                 <button key={index} className="w-full sm:w-[68px] h-7 rounded-full text-winb-text-dark-blue font-medium bg-white border-2 border-winb-blue-border hover:bg-slate-50">
//                   {brand}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Model */}
//           <div className="mb-6">
//             <div className="flex items-center mb-2 mt-4">
//               <FaCar className="w-6 h-6 text-gray-500 mr-4" />
//               <h3 className="text-base font-semibold text-black">Model</h3>
//             </div>
//             <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2 mt-4">
//               {['RAV4', 'RAV4', 'RAV4', 'RAV4', 'RAV4', 'RAV4', 'RAV4'].map((model, index) => (
//                 <button key={index} className="w-full sm:w-[68px] h-7 rounded-full text-winb-text-dark-blue font-medium bg-white border-2 border-winb-blue-border hover:bg-slate-50">
//                   {model}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Condition */}
//           <div className="mb-6">
//             <div className="flex items-center mb-2 mt-4">
//               <FaRegSnowflake className="w-6 h-6 text-gray-500 mr-4" />
//               <h3 className="text-base font-semibold text-black">Condition</h3>
//             </div>
//             <div className="grid grid-cols-2 gap-2 mt-4">
//               {['New', 'Used', 'CPO'].map((condition, index) => (
//                 <button key={index} className="w-full sm:w-[130px] h-7 rounded-full text-winb-text-dark-blue font-medium bg-white border-2 border-winb-blue-border hover:bg-slate-50">
//                   {condition}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Drive Type */}
//           <div className="mb-6">
//             <div className="flex items-center mb-2 mt-4">
//               <FaCogs className="w-6 h-6 text-gray-500 mr-4" />
//               <h3 className="text-base font-semibold text-black">Drive Type</h3>
//             </div>
//             <div className="grid grid-cols-2 gap-2 mt-4">
//               {['FWD', 'RWD', 'AWD', '4WD'].map((driveType, index) => (
//                 <button key={index} className="w-full sm:w-[144px] h-7 rounded-full text-winb-text-dark-blue font-medium bg-white border-2 border-winb-blue-border hover:bg-slate-50">
//                   {driveType}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Fuel Type */}
//           <div className="mb-6">
//             <div className="flex items-center mb-2 mt-4">
//               <FaGasPump className="w-6 h-6 text-gray-500 mr-4" />
//               <h3 className="text-base font-semibold text-black">Fuel Type</h3>
//             </div>
//             <div className="grid grid-cols-2 gap-2 mt-4">
//               {['Petrol', 'Diesel', 'Electric', 'Hybrid'].map((fuel, index) => (
//                 <button key={index} className="w-full sm:w-[144px] h-7 rounded-full text-winb-text-dark-blue font-medium bg-white border-2 border-winb-blue-border hover:bg-slate-50">
//                   {fuel}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Features */}
//           <div className="mb-6">
//             <div className="flex items-center mb-2 mt-4">
//               <FaStar className="w-6 h-6 text-gray-500 mr-4" />
//               <h3 className="text-base font-semibold text-black">Features</h3>
//             </div>
//             <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2 mt-4">
//               {['AC', 'AC', 'AC', 'AC', 'AC', 'AC'].map((feature, index) => (
//                 <button key={index} className="w-full sm:w-[68px] h-7 rounded-full text-winb-text-dark-blue font-medium bg-white border-2 border-winb-blue-border hover:bg-slate-50">
//                   {feature}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Column 2 */}
//         <div className="flex-grow">
//           <SearchVehicle />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Details;
