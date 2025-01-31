"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { PulseLoader } from "react-spinners";
import { useLocale } from "next-intl";

// Define types for vehicle and images
interface Vehicle {
  id: number;
  title: string;
  description: string;
  price: number;
  model: string;
  maker: string;
  vehicleType: string;
  fuel: string;
  drive: string;
  condition: string;
  color: string;
  grade: string;
  chassieNumber: string;
  Shaken: string;
  manufactureYear: string;
  mileage: number;
  isAvailable: boolean;
  isPublished: boolean;
  maxPassengers: number;
  imageCount: number;
  previewUrl: string;
  createdAt: string;
  updatedAt: string;
  images: ImageData[];
}

interface ImageData {
  id: number;
  vehicleId: number;
  url: string;
  createdAt: string;
  updatedAt: string;
}

const MoreDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const vid = typeof id === "string" ? parseInt(id) : null;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [currentPreview, setCurrentPreview] = useState<string | null>(null);
 const locale = useLocale();

  const fetchVehicle = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/vehicles/readOne?id=${vid}`);
      if (res.status === 200) {
        setVehicle(res.data);
        setCurrentPreview(res.data.previewUrl); // Set initial preview
      } else {
        console.error("Error fetching vehicle:", res.data.error);
      }
    } catch (error) {
      console.error("Failed to fetch vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vid) fetchVehicle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <PulseLoader color="#2563eb" size={20} />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">Vehicle not found.</p>
      </div>
    );
  }

  // Create a carousel array with preview image at the start and end
  const carouselImages = [
    { id: 0, url: vehicle.previewUrl },
    ...vehicle.images,
  ];

  return (
    <div className="relative w-full flex flex-col max-w-[1366px] mx-auto py-3 px-3 ">
      <div className="bg-[#08001C67] w-full flex items-center justify-center border border-[#00CCEE] rounded-[10px] min-h-32 my-auto">
        <Navbar />
      </div>

      <div className="mt-[110px] w-full h-auto bg-winb-ashcolor rounded-[15px] flex flex-col md:flex-row p-[39px]">
        <div className="flex flex-col w-full md:w-[612px]">
          {/* Large Preview Image */}
          <div className="w-full lg:h-[528px] bg-gray-300 rounded-lg overflow-hidden">
            <Image
              src={currentPreview || vehicle.previewUrl}
              alt="Large View"
              width={612}
              height={528}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Carousel */}
          <div className="mt-[51px] grid gap-4">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              loop
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 3 },
              }}
              className="w-full"
              onSlideChange={(swiper) => {
                const activeIndex = swiper.realIndex;
                setCurrentPreview(carouselImages[activeIndex].url);
              }}
            >
              {carouselImages.map((image) => (
                <SwiperSlide key={image.id}>
                  <div
                    className="w-[110px] lg:w-[110px] md:w-[100px] h-[110px] lg:h-[110px] md:h-[100px] bg-gray-300 rounded-lg overflow-hidden cursor-pointer items-center"
                    onClick={() => setCurrentPreview(image.url)}
                  >
                    <Image
                      src={image.url}
                      alt={`Small View ${image.id}`}
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

        {/* Vehicle Details */}
        <div className="mt-20 md:mt-0 md:ml-8 flex flex-col justify-start w-full md:w-[500px]">
          <h2 className="text-[30px] lg:text-[30px] md:text-[20px] text-black font-bold mb-4">
          {locale === "en" ? vehicle.title : "車両タイトル"}

          </h2>
          <p className="text-[24px] lg:text-[30px] md:text-[24px] text-black font-medium mb-4">
            {
                locale === "en"
                ? vehicle.description[0] 
                : vehicle.description[1]?.length > 0 
                ? vehicle.description[1]
                : vehicle.description[0]
              }
          </p>

          <div className="text-[24px] lg:text-[24px] md:text-[24px] mt-[46px] grid lg:grid-cols-2 md:grid-cols-3 gap-4 items-center">
            {[
              { label: locale === "en" ? "Price" : "価格", value: `¥ ${vehicle.price}` },
              { label: locale === "en" ? "Model" : "モデル", value: vehicle.model },
              { label: locale === "en" ? "Maker" : "メーカー", value: vehicle.maker },
              { label: locale === "en" ? "Maker" : "メーカー", value: vehicle.maker },
              { label: locale === "en" ? "Vehicle Type"  : "車両タイプ", value: vehicle.vehicleType },
              { label: locale === "en" ? "Fuel Type"  : "燃料の種類", value: vehicle.fuel },
              { label: locale === "en" ? "Drive Type"  : "ドライブタイプ", value: vehicle.drive },
              { label: locale === "en" ? "Color"  : "色", value: vehicle.color },
              { label: locale === "en" ? "Grade"  : "学年", value: vehicle.grade },
              { label: locale === "en" ? "Chassi Number"  : "車台番号", value: vehicle.chassieNumber },
              { label: locale === "en" ? "Shaken" : "動揺した" , value: vehicle.Shaken },
              {
                label: locale === "en" ? "Manufacture Year"  : "製造年",
                value: new Date(vehicle.manufactureYear).getFullYear(),
              },
              { label: locale === "en" ? "Milage" : "走行距離", value: vehicle.mileage },
              { label: locale === "en" ? "Condition" : "状態", value: vehicle.condition },
            ].map(({ label, value }, index) => (
              <div key={index} className="flex items-center">
                <p className="text-[20px] lg:text-[18px] md:text-[20px] text-black font-semibold">
                  {label}: {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-[55px] flex justify-end">
            <button>
              <Link
                href={`/contact?id=${vehicle.id}&title=${vehicle.title}`}
                className="bg-winb-yellow text-[20px] lg:text-[18px] md:text-[20px] text-black font-medium px-4 py-4 rounded-[25px] hover:bg-yellow-300 transition duration-300"
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
