import React from 'react';

function Feedback() {
  return (
    <div className="relative w-full flex flex-col max-w-[1166px] mx-auto mt-16 px-4 sm:px-6 lg:px-8 ">
      {/* Section Title */}
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        What Our Customers Say
      </h2>

      {/* Testimonials */}
      <div className="testimonials grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Testimonial Card 1 */}
        <div className="testimonial-box bg-gradient-to-r from-green-100 via-white to-green-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-green-500">
          <p className="text-gray-700 text-lg italic mb-6">
            "I found the perfect car for my family through this platform. The buying process was smooth, and the car was delivered on time!"
          </p>
          <h4 className="text-gray-900 font-semibold text-xl">
            - John, Buyer from Colombo
          </h4>
        </div>

        {/* Testimonial Card 2 */}
        <div className="testimonial-box bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500">
          <p className="text-gray-700 text-lg italic mb-6">
            "Selling my old car was hassle-free with this platform. I got a great price and excellent support throughout the process."
          </p>
          <h4 className="text-gray-900 font-semibold text-xl">
            - Priya, Seller from Galle
          </h4>
        </div>

        {/* Testimonial Card 3 */}
        <div className="testimonial-box bg-gradient-to-r from-purple-100 via-white to-purple-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-purple-500">
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