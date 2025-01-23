import React from 'react'

export type WhyToChooseCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
}
const WhyToChooseCard = ({icon, title, description}: WhyToChooseCardProps) => {
  return (
    <div className='border border-black rounded-lg w-72 h-64 mx-auto flex flex-col items-start transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-2xl'>
        {icon}
        <h3 className='text-2xl font-semibold'>{title}</h3>
        <p className='text-lg font-medium text-justify mt-4'>{description}</p>
    </div>
  )
}

export default WhyToChooseCard