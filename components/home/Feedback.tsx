import React from "react";
import { useLocale } from "next-intl";

function Feedback() {
  const locale = useLocale();

  return (
    <div className="relative w-full flex flex-col max-w-[1166px] mx-auto mt-16 px-4 sm:px-6 lg:px-8 ">
      {/* Section Title */}
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
        {locale === "en" ? "What Our Customers Say" : "お客様の声"}
      </h2>

      {/* Testimonials */}
      <div className="testimonials grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Testimonial Card 1 */}
        <div className="testimonial-box bg-gradient-to-r from-green-100 via-white to-green-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-green-500">
          <p className="text-gray-700 text-lg italic mb-6">
            {locale === "en"
              ? "I found the perfect car for my family through this platform. The buying process was smooth, and the car was delivered on time!"
              : "このプラットフォームを通じて、家族にぴったりの車を見つけました。購入プロセスはスムーズで、車は時間通りに配達されました。"}
          </p>
          <h4 className="text-gray-900 font-semibold text-xl">
            {locale === "en"
              ? "- John, Buyer from Colombo"
              : "コロンボのバイヤー、ジョン"}
          </h4>
        </div>

        {/* Testimonial Card 2 */}
        <div className="testimonial-box bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500">
          <p className="text-gray-700 text-lg italic mb-6">
            {locale === "en"
              ? "Selling my old car was hassle-free with this platform. I got a great price and excellent support throughout the process."
              : "このプラットフォームを使えば、古い車を売却するのに手間がかかりませんでした。プロセス全体を通して、素晴らしい価格と優れたサポートを得ることができました。"}
          </p>
          <h4 className="text-gray-900 font-semibold text-xl">
            {locale === "en"
              ? " - Priya, Seller from Galle"
              : "プリヤ、ゴールの販売者"}
          </h4>
        </div>

        {/* Testimonial Card 3 */}
        <div className="testimonial-box bg-gradient-to-r from-purple-100 via-white to-purple-100 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300 border-t-4 border-purple-500">
          <p className="text-gray-700 text-lg italic mb-6">
            {locale === "en"
              ? "I’ve never experienced such seamless service in vehicle purchases. Highly recommend this platform for all your car needs."
              : "車の購入でこれほどシームレスなサービスを経験したことはありません。車に関するあらゆるニーズにこのプラットフォームを強くお勧めします。"}
          </p>
          <h4 className="text-gray-900 font-semibold text-xl">
            {locale === "en"
              ? "- Ahmed, Buyer from Jaffna"
              : "- ジャフナのバイヤー、アハメド"}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
