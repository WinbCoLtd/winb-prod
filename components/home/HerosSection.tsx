import React from 'react'

function HerosSection() {
  return (
    <div className='relative w-full h-screen flex flex-col max-w-[1166px] mx-auto'>
        <div className='h-[100px] bg-red-300'>Nav
        </div>
        <div className='flex flex-col flex-1 bg-green-300 items-center py-10'>
            <h1 className='text-4xl font-bold mb-8'>Tharushi Nethmini Gampaha</h1>
            <div className='max-w-[600px] w-full h-10 bg-gray-300'></div>
        </div>
        <button className='absolute bottom-10 right-10'>Abc</button>
    </div>
  )
}

export default HerosSection