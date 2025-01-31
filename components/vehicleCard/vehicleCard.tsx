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
          {/* Vehicle Image */}
          <div className="flex-shrink-0">
            <Image
              src={`${vehicle.previewUrl}`}
              alt={vehicle.title}
              width={306}
              height={250}
              className="rounded-xl border border-gray-300 md:max-h-[350px]"
            />
          </div>

          {/* Vehicle Details */}
          <div className="flex flex-col flex-grow space-y-4">
            <h2 className="font-bold text-2xl text-gray-800">
              {locale === "en"
                ? vehicle.title.split("/")[0] // English: Show the first part
                : vehicle.title.split("/")[1]?.length > 0 // Non-English: Show the second part if it's non-empty
                ? vehicle.title.split("/")[1]
                : vehicle.title.split("/")[0]}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {locale === "en"
                ? vehicle.description.split("/")[0] // English: Show the first part
                : vehicle.description.split("/")[1]?.length > 0 // Non-English: Show the second part if it's non-empty
                ? vehicle.description.split("/")[1]
                : vehicle.description.split("/")[0]}
            </p>

            {/* Vehicle Info */}
            <div className="grid grid-cols-3 gap-4">
              {/* Fuel Type */}
              <div className="flex items-center space-x-2">
                <Fuel size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">Fuel Type</p>
                  <span className="text-gray-800 font-medium">
                    {locale === 'en' ? vehicle.fuel.split('/')[0] : vehicle.fuel.split('/')[1]}
                  </span>
                </div>
              </div>

              {/* Drive Type */}
              <div className="flex items-center space-x-2">
                <LifeBuoy size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">Drive Type</p>
                  <span className="text-gray-800 font-medium">
                  {locale === 'en' ? vehicle.drive.split('/')[0] : vehicle.drive.split('/')[1]}
                  </span>
                </div>
              </div>

              {/* Mileage */}
              <div className="flex items-center space-x-2">
                <Gem size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">Distance</p>
                  <span className="text-gray-800 font-medium">
                    {vehicle.mileage} km
                  </span>
                </div>
              </div>
            </div>

            {/* Condition (New Row) */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center space-x-2">
                <FaRegSnowflake size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">Condition</p>
                  <span className="text-gray-800 font-medium">
                    {locale === 'en' ? vehicle.condition.split('/')[0] : vehicle.condition.split('/')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* More Info Button */}
            <div className="flex justify-center mt-auto">
              <Link href={`/searchVehicle/${vehicle.id}`}>
                <button
                  type="button"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm py-2 px-4 rounded-full flex items-center space-x-2 ml-auto md:ml-0"
                >
                  <span>More info</span>
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
