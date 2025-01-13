'use client'; 

import React from 'react'
import { useState } from "react";

function Car() {
     const [showCarDetails, setShowCarDetails] = useState(false); // State for showing car details
     // Toggle car details visibility
  const toggleCarDetails = () => {
    setShowCarDetails((prevState) => !prevState);
  };

  
    console.log(showCarDetails)
  return (
    <button
    onClick={toggleCarDetails} // Toggle car details visibility
    className="text-[20px] text-[#6e6e6e] font-semibold hover:underline"
  >
    Cars
  </button>
  
  )
}

export default Car