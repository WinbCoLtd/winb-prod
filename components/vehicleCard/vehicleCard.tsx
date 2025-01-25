import { ChevronLeft, Fuel, Gem, LifeBuoy } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { FaRegSnowflake } from 'react-icons/fa';

export type vehicleCardProps = {
  vehicle: {
    id: number;
    image: string;
    title: string;
    price: string;
    fuel: string;
    drive: string;
    description: string;
    condition: string;
    milage: number;
  }
}

const vehicleCard = ({vehicle }: vehicleCardProps) => {
  return (
    <div className='flex items-center justify-between bg-[#d9d9d914] rounded-2xl p-4 max-w-[887px] w-full min-h-[275px] border border-[#00000043]'>
      {
        vehicle.image && (
          <div className='flex relative'>
            <Image src={vehicle.image} alt={vehicle.title} width={306} height={230} className='aspect-video rounded-2xl border border-[#00000024]' />
            <div className='flex-1 flex flex-col space-y-2 relative'>
              <h2 className='font-bold text-2xl text-black'> {vehicle.title} </h2>
              <p className='font-medium text-sm text-black text-left'> {vehicle.description} </p>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <Fuel size={20} className='mr-1' />
                  <div className='flex flex-col'>
                    <p>Fuel Type</p>
                    <span> {vehicle.fuel} </span>
                  </div>
                </div>
                <div className='flex items-start'>
                  <LifeBuoy size={20} className='mr-1' />
                  <div className='flex flex-col'>
                    <p>Drive Type</p>
                    <span> {vehicle.drive} </span>
                  </div>
                </div>
                <div className='flex items-start'>
                  <FaRegSnowflake size={20} className='mr-1' />
                  <div className='flex flex-col'>
                    <p>Condition</p>
                    <span> {vehicle.condition} </span>
                  </div>
                </div>
                <div className='flex items-start'>
                  <Gem size={20} className='mr-1' />
                  <div className='flex flex-col'>
                    <p>Distance</p>
                    <span> {vehicle.milage}km </span>
                  </div>
                </div>
              </div>
            <button type="button" className='bg-[#fcdb02] rounded-[25px] flex items-center justify-center py-2 px-3 max-w-44 min-h-10 text-black font-medium text-sm absolute right-2 bottom-2 '>More info <ChevronLeft size={15} />  </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default vehicleCard