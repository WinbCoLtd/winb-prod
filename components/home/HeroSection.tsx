import React from 'react'
import Image from "next/image";

function HerosSection() {
  return (
    <div className='relative w-full h-screen flex flex-col max-w-[1166px] max-h-auto mx-auto'>
      <div className='h-[100px] bg-red-300'>Navbar</div>
      
      <div className="relative flex flex-col flex-1 bg-black items-center">
      <Image
        src="/home/homepic.png"
        alt="Vehicle Marketplace"
        layout="responsive"
        width={1166}
        height={847}
        className="opacity-50 sm:w-full sm:h-auto md:w-[500px] md:h-[400px] xs:w-[350px] xs:h-[250px]"
      />

      <h1 className="absolute mt-6 sm:mt-11 text-white text-[24px] sm:text-[32px] md:text-[48px] lg:text-[64px] xl:text-[80px] font-bold animate-fadeIn text-center px-4">
        Your Trusted Marketplace
      </h1>

        <button className='absolute bottom-10 right-10 w-[175px] h-[54px] bg-white text-black rounded-lg hover:bg-slate-300 sm:w-[150px] sm:h-[45px] xs:w-[130px] xs:h-[40px] flex items-center justify-center space-x-2 p-2'>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-[33px] h-[33px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2C8.134 2 5 5.134 5 9c0 3.6 3 6.64 7.24 12.5L12 21l.76-1.5C16 15.64 19 12.6 19 9c0-3.866-3.134-7-7-7z" />
          </svg>
          <span className="text-xs sm:text-sm xs:text-xs">View on the Map</span>
        </button>
      </div>

      <div className="absolute top-[50%] left-0 w-full px-4 flex justify-center items-center">
      <div className="bg-white p-2 rounded-lg w-[770px] sm:w-[90%] md:w-[80%] lg:w-[70%] flex flex-row flex-wrap items-center justify-between gap-3">
  {/* Select Fields */}
  <select className="border p-2 rounded-lg w-[150px] sm:w-[150px] md:w-[150px] text-gray-700 text-xs sm:text-sm md:text-base">
    <option value="">All Marks</option>
    <option value="ford">Ford</option>
    <option value="chevy">Chevrolet</option>
    <option value="toyota">Toyota</option>
    <option value="bmw">BMW</option>
  </select>

  <select className="border p-2 rounded-lg w-[150px] sm:w-[150px] md:w-[150px] text-gray-700 text-xs sm:text-sm md:text-base">
    <option value="">All Models</option>
    <option value="sedan">Sedan</option>
    <option value="suv">SUV</option>
    <option value="truck">Truck</option>
  </select>

  <select className="border p-2 rounded-lg w-[150px] sm:w-[150px] md:w-[150px] text-gray-700 text-xs sm:text-sm md:text-base">
    <option value="">Pricing</option>
    <option value="low">Low to High</option>
    <option value="high">High to Low</option>
  </select>

  {/* Search Button */}
    <button className="bg-yellow-500 text-black p-1 rounded-lg hover:bg-yellow-600 w-[150px] sm:w-[135px] sm:h-[49px] h-[39px] text-xs sm:text-base md:text-lg mx-auto">
      Search
    </button>
  </div>

      </div>
    </div>
  )
}

export default HerosSection;




// import React from 'react'
// import Image from "next/image";
// function HerosSection() {
//   return (
//     <div className='relative w-full h-screen flex flex-col max-w-[1166px] mx-auto'>
//         <div className='h-[100px] bg-red-300'>Nav</div>
//         <div className='flex flex-col flex-1 bg-black items-center '>
//         <h1 className='text-4xl  mb-8 text-white text-[64px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-extrabold animate-fadeIn text-center'>Your Trusted Market Place</h1>
//           <Image
//                     src="/home/homepic.png"
//                     alt="Vehicle Marketplace"
//                     layout="responsive"
//                     width={1166}
//                     height={847}
//                     className="opacity-50"
//                   />
           
//             <div className='max-w-[600px] w-full h-10 bg-gray-300'></div>
//         </div>
//         <button className='absolute bottom-10 right-10'>Abc</button>
//     </div>
//   )
// }

// export default HerosSection