import Image from 'next/image'
import React from 'react'

const DealSection = () => {
  return (
    <div>
              {/* New Section */}
      <div className="mt-12 bg-[#D9D9D9] px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <Image
              src="/vehicledummy.png"
              alt="New Section Image"
              width={591}
              height={557}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-[24px] sm:text-[28px] md:text-[32px] font-semibold text-black">
              Get the Best Deal for Your Vehicle Today
            </h3>
            <p className="mt-4 text-[16px] sm:text-[18px] font-medium text-[#333333]">
              Join thousands of satisfied customers who found their perfect car with us. We offer exclusive benefits and 24/7 support.
            </p>

            <ul className="mt-4 text-[16px] sm:text-[18px] font-medium text-[#333333] list-disc pl-5">
              <li className="mt-2">Largest network of certified cars.</li>
              <li className="mt-2">Round-the-clock customer assistance.</li>
              <li className="mt-2">Unmatched roadside assistance for all our vehicles.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DealSection