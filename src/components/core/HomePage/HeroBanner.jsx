import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HighlightText from "./HighlightText";

const HeroBanner = () => {
  return (
    <motion.section
      className="relative bg-gray-900 text-white py-10 md:py-20 overflow-hidden lg:w-full md:w-full lg:ml-0 mx-auto w-[350px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto text-center relative z-10 px-4 max-w-full">
        <motion.h1
          className="text-2xl md:text-6xl font-bold mb-4 break-words"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <HighlightText text={"Welcome to Brainwave Academy"} />
        </motion.h1>
        <motion.p
          className="text-sm md:text-xl mb-8 break-words"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span
            className="bg-gradient-to-b from-[#a05445] to-[#F09819] 
            text-transparent bg-clip-text font-bold"
          >
            Learn, Grow, Succeed
          </span>
        </motion.p>
        <motion.button
          className="bg-richblack-800 hover:bg-richblack-700 text-white py-2 px-4 rounded-lg text-base md:text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/signup">Get started</Link>
        </motion.button>
      </div>
    </motion.section>
  );
};

export default HeroBanner;
