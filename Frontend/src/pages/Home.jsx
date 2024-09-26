import React from "react";
import Offerings from "../components/core/HomePage/Offerings";
import HeroBanner from "../components/core/HomePage/HeroBanner";
import Testimonial from "../components/core/HomePage/Testimonial";
import Stats from "../components/core/HomePage/Stats";
import FAQ from "../components/core/HomePage/FAQ";
import ReviewSlider from "../components/common/ReviewSlider";

function Home() {
  return (
    <div className="mx-auto my-1 text-center flex flex-col gap-4 lg:gap-16">
      <HeroBanner />
      <Stats />
      <Offerings />
      <Testimonial />
      <ReviewSlider />
      <FAQ />
    </div>
  );
}

export default Home;
