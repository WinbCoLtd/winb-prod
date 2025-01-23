import React from 'react';

function Feedback() {
  return (
    <div className="relative w-full flex flex-col max-w-[1166px] mx-auto mt-16 mb-16 px-4 sm:px-6 lg:px-8 ">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        What Our Customers Say
      </h2>

      <div className="testimonials grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="testimonial-box bg-gradient-to-r from-yellow-100 via-white to-yellow-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-yellow-300">
          <p className="text-gray-700 text-lg italic mb-6">
            "I found the perfect car for my family through this platform. The buying process was smooth, and the car was delivered on time!"
          </p>
          <h4 className="text-gray-900 font-semibold text-xl">
            - John, Buyer from Colombo
          </h4>
        </div>

        <div className="testimonial-box bg-gradient-to-r from-gray-300 via-white to-gray-300 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-gray-500">
          <p className="text-gray-700 text-lg italic mb-6">
            "Selling my old car was hassle-free with this platform. I got a great price and excellent support throughout the process."
          </p>
          <h4 className="text-gray-900 font-semibold text-xl">
            - Priya, Seller from Galle
          </h4>
        </div>

        <div className="testimonial-box bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-blue-300">
          <p className="text-gray-700 text-lg italic mb-6">
            "I’ve never experienced such seamless service in vehicle purchases. Highly recommend this platform for all your car needs."
          </p>
          <h4 className="text-gray-900 font-semibold text-xl">
            - Ahmed, Buyer from Jaffna
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
