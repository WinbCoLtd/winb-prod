import React from 'react'
import Image from "next/image";
import Link from "next/link"; 
function Help() {
  return (
    <div className='relative w-full flex flex-col max-w-[1166px] mx-auto'>
        <div className="mt-12 relative bg-black">
            <Image
            src="/home/vehicle.png"
            alt="Need Assistance"
            width={1153}
            height={473}
            className="w-full h-[300px] sm:h-[400px] md:h-[473px] object-cover rounded-[15px]"/>

          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 text-white bg-black bg-opacity-60">
          <h2 className="text-[20px] sm:text-[24px] md:text-[32px] lg:text-[40px] font-bold text-left ">
            Need Assistance? We're Here to Help!
            </h2>
            <p className="mt-4 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[24px] font-semibold text-center md:text-justify">
                Have questions about our services or need more information? Our team is here to help. If you'd like to learn more about WIN-B or have any specific questions, feel free to contact us. Your satisfaction is our number one priority.
            </p>
                     <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10">
         <Link href="/contact">
             <button className="bg-winb-yellow text-black text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-[25px] font-semibold hover:bg-yellow-600 w-[100px] sm:w-[120px] md:w-[150px] lg:w-[180px] h-[36px] sm:h-[40px] md:h-[48px] lg:h-[56px]">
             Contact Us
             </button>
         </Link>
         </div>
          </div>
         
          </div>    
        
    </div>
  )
}

export default Help

