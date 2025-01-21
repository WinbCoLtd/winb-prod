"use client";

function MostHeroSection() {
  return (
    <section className="max-w-winb-max-1366 py-16 px-6 space-y-2">
      <h2 className="text-4xl font-semibold text-black">The Most Searched</h2>
      <h2 className="text-2xl font-medium text-black">最も検索された</h2>

      <div className="space-x-4">
        <button className="text-[20px] text-[#6e6e6e] font-semibold hover:underline">
          Cars
        </button>
        <button className="text-[20px] text-[#6e6e6e] font-semibold hover:underline">
          Vans
        </button>
      </div>
    </section>
  );
}

export default MostHeroSection;
