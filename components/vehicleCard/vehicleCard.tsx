import {  ChevronRight, Fuel, Gem, LifeBuoy } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { FaRegSnowflake } from 'react-icons/fa';

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
    milage: number;
  };
};

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  return (
    <div className=" relative flex bg-white shadow-md rounded-2xl p-5 max-w-[987px] w-full min-h-[300px] border border-gray-200 mb-6">
      {vehicle.previewUrl && (
        <div className="flex gap-5 w-full">
          {/* Vehicle Image */}
          <div className="flex-shrink-0">
            <Image
              src={`http://localhost:3000${vehicle.previewUrl}`}
              alt={vehicle.title}
              width={306}
              height={250}
              className="rounded-xl border border-gray-300 lg:max-h-[250px]"
            />
          </div>

          {/* Vehicle Details */}
          <div className="flex flex-col flex-grow space-y-4">
            <h2 className="font-bold text-2xl text-gray-800">{vehicle.title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{vehicle.description}</p>

            {/* Vehicle Info */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Fuel Type */}
              <div className="flex items-center space-x-2">
                <Fuel size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">Fuel Type</p>
                  <span className="text-gray-800 font-medium">{vehicle.fuel}</span>
                </div>
              </div>

              {/* Drive Type */}
              <div className="flex items-center space-x-2">
                <LifeBuoy size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">Drive Type</p>
                  <span className="text-gray-800 font-medium">{vehicle.drive}</span>
                </div>
              </div>

              {/* Condition */}
              <div className="flex items-center space-x-2">
                <FaRegSnowflake size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">Condition</p>
                  <span className="text-gray-800 font-medium">{vehicle.condition}</span>
                </div>
              </div>

              {/* Mileage */}
              <div className="flex items-center space-x-2">
                <Gem size={20} className="text-gray-600" />
                <div className="text-sm">
                  <p className="text-gray-500">Distance</p>
                  <span className="text-gray-800 font-medium">{vehicle.milage} km</span>
                </div>
              </div>
            </div>

            {/* More Info Button */}
            <div className=" absolute bottom-10 right-4 flex justify-end mt-auto">
              <button
                type="button"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm py-2 px-4 rounded-full flex items-center space-x-2"
              >
                <span>More info</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCard;
