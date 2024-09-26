import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HighlightText from "./HighlightText";
import Spline from "@splinetool/react-spline";

const HeroBanner = () => {
  return (
    <motion.section
      className="relative h-screen  w-full lg:w-fit mx-auto top-0 flex items-center justify-center overflow-hidden "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Centered Text Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 2 }}
        >
          <HighlightText text={"Welcome to Brainwave Academy"} />
        </motion.h1>
        <motion.p
          className="text-base md:text-lg lg:text-xl mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <span
            className="bg-gradient-to-b from-[#a05445] to-[#F09819] 
            text-transparent bg-clip-text font-bold"
          >
            Learn, Grow, Succeed
          </span>
        </motion.p>
        <motion.button
          className="bg-richblack-800 hover:bg-richblack-700 text-white py-2 px-4 rounded-lg text-sm md:text-base lg:text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/signup">Get started</Link>
        </motion.button>
      </div>

      {/* Spline background */}
      <div className="absolute inset-0 w-full h-screen z-0">
        <Spline scene="https://prod.spline.design/4rellZQ0KKwq7ZYv/scene.splinecode" />
      </div>
    </motion.section>
  );
};

export default HeroBanner;
