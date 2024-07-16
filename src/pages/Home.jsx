import React from "react";
import Offerings from "../components/core/HomePage/Offerings";
import HeroBanner from "../components/core/HomePage/HeroBanner";
import ReviewSlider from "../components/common/ReviewSlider";

function Home() {
  return (
    <div className="text-3xl mx-auto my-[10%] text-center flex flex-col gap-8">
      <HeroBanner />

      <div className="  w-[350px] md:w-full lg:w-full lg:ml-0 ml-6 text-white mt-12 font-inter font-semibold  text-xl md:text-4xl">
        Core Offerings
      </div>
      <Offerings />

      <h2 className="  w-[350px] md:w-full lg:w-full lg:ml-0 ml-4 text-white mt-12 font-inter font-semibold  text-xl md:text-4xl">
        Review From Other Learners
      </h2>
      {/* Review Slider here */}
      <ReviewSlider />
    </div>
  );
}

export default Home;
