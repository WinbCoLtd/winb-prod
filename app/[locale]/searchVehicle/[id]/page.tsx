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
          <div className="w-full bg-white p-4 rounded-lg shadow-md">
            <table className="w-full table-auto border-collapse">
              <tbody>
                <tr>
                  <td className="py-2 px-4 text-[20px] font-bold text-black ">
                    {locale === "en"
                      ? vehicle.title.split("@/@")[0]
                      : vehicle.title.split("@/@")[1]?.length > 0
                      ? vehicle.title.split("@/@")[1]
                      : vehicle.title.split("@/@")[0]}
                  </td>
                  <td
                    className="py-3 text-[22px] text-white font-extrabold border-2 
  bg-gradient-to-r from-red-500 to-red-700 shadow-md rounded-md text-center h-16"
                  >
                    <div className=" items-center justify-center h-full">
                      ¥{" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "decimal",
                      }).format(Number(vehicle.price))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full mt-[18px] p-4 rounded-lg shadow-md">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="text-left text-lg font-bold p-3 border">
                    {locale === "en" ? "Attribute" : "属性"}
                  </th>
                  <th className="text-left text-lg font-bold p-3 border">
                    {locale === "en" ? "Details" : "詳細"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Maker@/@メーカー",
                    value:
                      locale === "en"
                        ? vehicle.maker.split("@/@")[0]
                        : vehicle.maker.split("@/@")[1]?.length > 0
                        ? vehicle.maker.split("@/@")[1]
                        : vehicle.maker.split("@/@")[0],
                  },
                  {
                    label: "Model@/@モデル",
                    value:
                      locale === "en"
                        ? vehicle.model.split("@/@")[0]
                        : vehicle.model.split("@/@")[1]?.length > 0
                        ? vehicle.model.split("@/@")[1]
                        : vehicle.model.split("@/@")[0],
                  },
                  {
                    label: "Manufacture Year@/@年式",
                    value: new Date(vehicle.manufactureYear).getFullYear(),
                  },
                  {
                    label: "Grade@/@グレード",
                    value:
                      locale === "en"
                        ? vehicle.grade.split("@/@")[0]
                        : vehicle.grade.split("@/@")[1]?.length > 0
                        ? vehicle.grade.split("@/@")[1]
                        : vehicle.grade.split("@/@")[0],
                  },
                  {
                    label: "Fuel Type@/@燃料の種類",
                    value:
                      locale === "en"
                        ? vehicle.fuel.split("@/@")[0]
                        : vehicle.fuel.split("@/@")[1]?.length > 0
                        ? vehicle.fuel.split("@/@")[1]
                        : vehicle.fuel.split("@/@")[0],
                  },
                  {
                    label: "Vehicle Type@/@車両タイプ",
                    value:
                      locale === "en"
                        ? vehicle.vehicleType.split("@/@")[0]
                        : vehicle.vehicleType.split("@/@")[1]?.length > 0
                        ? vehicle.vehicleType.split("@/@")[1]
                        : vehicle.vehicleType.split("@/@")[0],
                  },

                  {
                    label: "Drive Type@/@ドライブタイプ",
                    value:
                      locale === "en"
                        ? vehicle.drive.split("@/@")[0]
                        : vehicle.drive.split("@/@")[1]?.length > 0
                        ? vehicle.drive.split("@/@")[1]
                        : vehicle.drive.split("@/@")[0],
                  },
                  {
                    label: "Milage@/@走行距離",
                    value: `${new Intl.NumberFormat("en-US").format(
                      vehicle.mileage
                    )} km`,
                  },
                  {
                    label: "Color@/@色",
                    value:
                      locale === "en"
                        ? vehicle.color.split("@/@")[0]
                        : vehicle.color.split("@/@")[1]?.length > 0
                        ? vehicle.color.split("@/@")[1]
                        : vehicle.color.split("@/@")[0],
                  },
                  {
                    label: "Condition@/@状態",
                    value:
                      locale === "en"
                        ? vehicle.condition.split("@/@")[0]
                        : vehicle.condition.split("@/@")[1]?.length > 0
                        ? vehicle.condition.split("@/@")[1]
                        : vehicle.condition.split("@/@")[0],
                  },
                  {
                    label: "Chassi Number@/@車台番号",
                    value:
                      locale === "en"
                        ? vehicle.chassieNumber.split("@/@")[0]
                        : vehicle.chassieNumber.split("@/@")[1]?.length > 0
                        ? vehicle.chassieNumber.split("@/@")[1]
                        : vehicle.chassieNumber.split("@/@")[0],
                  },
                  {
                    label: "Shaken@/@車検",
                    value:
                      locale === "en"
                        ? vehicle.Shaken[0]
                        : vehicle.Shaken[1]?.length > 0
                        ? vehicle.Shaken[1]
                        : vehicle.Shaken[0],
                  },
                ].map(({ label, value }, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-100">
                    <td className="p-3 border font-semibold">
                      {locale === "en"
                        ? label.split("@/@")[0]
                        : label.split("@/@")[1]}
                    </td>
                    <td className="p-3 border text-gray-800">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-[20px] lg:text-[18px] md:text-[20px] text-slate-600 font-medium mb-4 leading-relaxed whitespace-normal break-words">
            {locale === "en"
              ? vehicle.description.split("@/@")[0]
              : vehicle.description.split("@/@")[1]?.length > 0
              ? vehicle.description.split("@/@")[1]
              : vehicle.description.split("@/@")[0]}
          </p>

          <div className="mt-[55px] flex justify-center w-full">
            <Link
              href={`/contact?id=${vehicle.id}&title=${
                vehicle.title.split("@/@")[0]
              }`}
              className="bg-winb-yellow text-[20px] lg:text-[18px] md:text-[20px] text-black font-medium px-4 py-3 rounded-[25px] hover:bg-yellow-300 transition duration-300 w-full sm:w-auto text-center"
            >
              {locale === "en"
                ? "Request More Information"
                : "詳細情報をリクエスト"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreDetails;
