import { ChevronRight, Fuel, Gem, LifeBuoy } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegSnowflake } from "react-icons/fa";

export type VehicleCardProps = {
  vehicle: {
    id: number;
    previewUrl: string;
    title: string;
    price: string;
    fuel: string;
    drive: string;
    description: string;
    condition: string;
    mileage: number;
  };
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const locale = useLocale();

  return (
    <div className="relative flex flex-col md:flex-row bg-white shadow-md rounded-2xl p-5 max-w-[987px] w-full min-h-[300px] border border-gray-200 mb-6">
      {vehicle.previewUrl && (
        <div className="flex flex-col md:flex-row gap-5 w-full">
          <div className="flex justify-center items-center">
            <Image
              src={`${vehicle.previewUrl}`}
              alt={vehicle.title}
              width={306}
              height={250}
              className="rounded-xl border border-gray-300 md:max-h-[350px]"
            />
          </div>

          <div className="flex flex-col flex-grow space-y-4">
            <h2 className="font-bold text-2xl text-gray-800">
              {locale === "en"
                ? vehicle.title.split("@/@")[0]
                : vehicle.title.split("@/@")[1]?.length > 0
                ? vehicle.title.split("@/@")[1]
                : vehicle.title.split("@/@")[0]}
            </h2>

            <div className="grid grid-cols-3 gap-4 ">
              <div className="flex items-center space-x-2 mt-5">
                <Fuel size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">
                    {" "}
                    {locale === "en" ? "Fuel Type" : "燃料の種類"}
                  </p>
                  <span className="text-gray-800 font-medium">
                    {locale === "en"
                      ? vehicle.fuel.split("@/@")[0]
                      : vehicle.fuel.split("@/@")[1]}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-5">
                <LifeBuoy size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">
                    {locale === "en" ? "Drive Type" : "ドライブタイプ"}
                  </p>
                  <span className="text-gray-800 font-medium">
                    {locale === "en"
                      ? vehicle.drive.split("@/@")[0]
                      : vehicle.drive.split("@/@")[1]}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-5">
                <Gem size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">
                    {locale === "en" ? "Distance" : "距離"}
                  </p>
                  <span className="text-gray-800 font-medium">
                    {new Intl.NumberFormat("en-US").format(vehicle.mileage)} km
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2 mt-5">
                <FaRegSnowflake size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">
                    {locale === "en" ? "Condition" : "状態"}
                  </p>
                  <span className="text-gray-800 font-medium">
                    {locale === "en"
                      ? vehicle.condition.split("@/@")[0]
                      : vehicle.condition.split("@/@")[0]}
                  </span>
                </div>
              </div>
            </div>

            <p className=" w-[550px] text-gray-600 text-[16px] leading-relaxed whitespace-normal break-words ">
              {locale === "en"
                ? vehicle.description.split("@/@")[0]
                : vehicle.description.split("@/@")[1]?.length > 0
                ? vehicle.description.split("@/@")[1]
                : vehicle.description.split("@/@")[0]}
            </p>
            <div className="flex justify-start">
              <Link href={`/searchVehicle/${vehicle.id}`}>
                <button
                  type="button"
                  className="mt-5 bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm py-2 px-4 rounded-full flex items-center space-x-2 ml-auto md:ml-0"
                >
                  <span>{locale === "en" ? "More info" : "詳細情報"}</span>
                  <ChevronRight size={15} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;
