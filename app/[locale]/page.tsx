import Deal from '@/components/deal/deal'
import HerosSection from '@/components/home/HeroSection'
import VehicleCard from '@/components/vehicleCard/vehicleCard'
import Help from '@/components/help/help'
import React from 'react'

function Home() {
  return (
   <main>
     {/* <HerosSection/> */}
     <VehicleCard/>
     <Deal/>
     <Help/>
   </main>
   
  )
}

export default Home