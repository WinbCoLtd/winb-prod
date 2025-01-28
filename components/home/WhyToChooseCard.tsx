import React from 'react'
import { useLocale } from "next-intl";

export type WhyToChooseCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
}
const WhyToChooseCard = ({icon, title, description}: WhyToChooseCardProps) => {
  const local = useLocale()
  return (
    <div className='border border-black rounded-lg w-72 h-64 mx-auto flex flex-col items-start transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-2xl'>
        {icon}
        <h3 className='text-2xl font-semibold'>{local == 'en' ? title.split(',')[0] : title.split(',')[1].length > 0 ? title.split(',')[1] : title.split(',')[0]}</h3>
        <p className='text-lg font-medium text-justify mt-4'>{local == 'en' ? description.split(',')[0] : description.split(',')[1].length > 0 ? description.split(',')[1] : description.split(',')[0]}</p>
    </div>
  )
}

export default WhyToChooseCard