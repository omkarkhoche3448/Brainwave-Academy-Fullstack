import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/Logo/brainwave-academy-logo-white-transparent.png";

const SplashScreen = () => {
  return (
    <div
      className="flex justify-center items-center
    w-screen min-h-screen bg-richblack-900  flex-col font-inter"
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
        exit={{ opacity: 0, y: -100 }}
        className="flex justify-center items-center "
      >
        <img src={logo} alt="Logo" className="w-100 h-24" />
      </motion.div>
    </div>
  );
};

export default SplashScreen;
