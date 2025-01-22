"use client"; 

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

const MoreDetails = () => {
  const { id } = useParams(); 

  const vehicleId = typeof id === 'string' ? parseInt(id) : null;

  const vehicles = [
    {
      id: 1,
      name: "Vehicle#1",
      description: "A reliable and fuel-efficient sedan perfect for daily commuting. Well-maintained with a clean interior and exterior.",
      imageUrl: "/cardvehicle.png",
      fuelType: "Petrol",
      driveType: "AWD",
      condition: "New",
      engine:"1.8L I4",
      exterior:"Silver",
      interior:"Black",
      transmission:"Automatic"
    },
    {
      id: 2,
      name: "Vehicle#2",
      description: "A spacious SUV with advanced safety features. Great for family trips and off-road adventures.",
      imageUrl: "/cardvehicle.png",
      fuelType: "Diesel",
      driveType: "FWD",
      condition: "Used",
      engine:"1.8L I4",
      exterior:"Silver",
      interior:"Black",
      transmission:"Automatic"
    },
    {
      id: 3,
      name: "Vehicle#3",
      description: "A luxury sports car with a sleek design and high performance for driving enthusiasts.",
      imageUrl: "/cardvehicle.png",
      fuelType: "Electric",
      driveType: "AWD",
      condition: "Used",
      engine:"1.8L I4",
      exterior:"Silver",
      interior:"Black",
      transmission:"Automatic"
    },
  ];

  const vehicle = vehicles.find((v) => v.id === vehicleId);

  if (!vehicle) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="relative w-full flex flex-col max-w-[1166px] mx-auto">
      <div className="mt-6 h-[127px] bg-gray-200 flex items-center justify-between px-4 md:px-8">
        Nav
      </div>

      <div className="mt-[110px] w-full h-auto bg-winb-ashcolor rounded-[15px] flex flex-col md:flex-row p-[39px]">
        <div className="flex flex-col w-full md:w-[612px]">
          <div className="w-full lg:h-[528px] bg-gray-300 rounded-lg overflow-hidden">
            <Image
              src={vehicle.imageUrl}
              alt="Large View"
              width={612}
              height={528}
              className="w-full h-full object-cover"
            />
          </div>
  
          <div className="mt-[51px] grid  gap-4">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="w-full"
            >

            {Array(4)
              .fill(vehicle.imageUrl)
              .map((src, index) => (
                <SwiperSlide key={index}>
                <div className="w-full lg:h-[110px] bg-gray-300 rounded-lg overflow-hidden">
                  <Image
                    src={src}
                    alt={`Small View ${index + 1}`}
                    width={110}
                    height={110}
                    className="w-full h-full object-cover"
                  />
                </div>
                </SwiperSlide>
              ))}
               </Swiper>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:ml-8 flex flex-col justify-start w-full md:w-[500px]">
          <h2 className="lg:text-[24px] sm:text-[11px] xxs:text[20px] text-black font-bold mb-4">
            {vehicle.name} 
          </h2>
          <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-medium mb-4">
            {vehicle.description} 
          </p>
          <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-medium mb-4">
            Key features include an advanced infotainment system, adaptive cruise control, rear parking sensors, and a rearview camera for convenience and safety. The vehicle offers a smooth and comfortable ride in the city and on the highway.
          </p>
          <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-medium">
            With 45,000km on the odometer and the latest safety features, this well-maintained vehicle is waiting for its next owner. Don't miss out — contact us today to schedule a test drive or for more information!
          </p>

          <div className="mt-[46px] grid lg:grid-cols-3 sm:grid-cols-3 xxs:grid-cols-3 md:grid-cols-4 gap-4 items-center">
            {[{ src: '/vehicleDetails/fuel-icon.png', label: 'Fuel Type' },
              { src: '/vehicleDetails/drive-icon.png', label: 'Drive Type' },
              { src: '/vehicleDetails/condition-icon.png', label: 'Condition' }].map(({ src, label }, index) => (
              <div key={index} className="flex items-center">
                <Image src={src} alt={label} width={16} height={16} className="w-4 h-4 mr-2" />
                <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-semibold">{label}</p>
              </div>
            ))}
          </div>
  
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 xxs:grid-cols-3 md:grid-cols-4 gap-4 text-center">
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">{vehicle.fuelType}</p>
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">{vehicle.driveType}</p>
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">{vehicle.condition}</p>
          </div>
  
          <div className="mt-[46px] grid lg:grid-cols-4 sm:grid-cols-4 xxs:grid-cols-4 md:grid-cols-4 gap-4 items-center">
            {[ 
              { src: '/vehicleDetails/engine.png', label: 'Engine' },
              { src: '/vehicleDetails/exterior.png', label: 'Exterior Colour' },
              { src: '/vehicleDetails/interior.png', label: 'Interior Colour' },
              { src: '/vehicleDetails/transmission.png', label: 'Transmission' },
            ].map(({ src, label }, index) => (
              <div key={index} className="flex items-center">
                <Image src={src} alt={label} width={16} height={16} className="w-4 h-4 mr-2" />
                <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-black font-semibold">{label}</p>
              </div>
            ))}
          </div>
  
          <div className="mt-4 grid lg:grid-cols-4 sm:grid-cols-4 xxs:grid-cols-4 md:grid-cols-4 gap-4 text-center">
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">1.8L I4</p>
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">Silver</p>
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">Black</p>
            <p className="lg:text-[13px] sm:text-[11px] xxs:text-[9px] text-winb-ash font-medium">Automatic</p>
          </div>
  
          <div className="mt-[55px] flex justify-end">
            <button>
              <Link
                    href={`/inquiry`}
                    className="bg-winb-yellow text-sm md:text-[15px] text-black font-medium px-4 py-2 rounded-[25px] hover:bg-yellow-300 transition duration-300"
              >
                Request More Information
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;




















