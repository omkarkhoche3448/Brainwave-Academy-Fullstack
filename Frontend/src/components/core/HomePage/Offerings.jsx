import React from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUsers,
  FaCertificate,
  FaTools,
  FaVideo,
} from "react-icons/fa";

const offerings = [
  {
    title: "Learn On Demand",
    description: "Learn at your own pace, from anywhere in the world.",
    icon: <FaGraduationCap className="w-8 h-8 " />,
  },
  {
    title: "Expert Guidance",
    description: "Learn everything from the best in the industry experts.",
    icon: <FaUsers className="w-8 h-8" />,
  },
  {
    title: "Certificate On Completion",
    description: "After completing the course, you'll receive a certificate.",
    icon: <FaCertificate className="w-8 h-8" />,
  },
  {
    title: "Closed Premium Community",
    description:
      "Once enrolled in the course, get access to the premium NamasteDev community.",
    icon: <FaUsers className="w-8 h-8" />,
  },
  {
    title: "Project Based Learning",
    description:
      "Learn everything from scratch by building super-cool projects.",
    icon: <FaTools className="w-8 h-8" />,
  },
  {
    title: "In Depth High Quality Videos",
    description:
      "Get access to all the high quality videos at your fingertips.",
    icon: <FaVideo className="w-8 h-8" />,
  },
];

const Offerings = () => {
  return (
    <div className="w-full mx-auto text-white mt-12">
      <h2 className="font-inter font-semibold text-2xl md:text-4xl mb-8">
        Core Offerings
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto p-6"
      >
        {offerings.map((offering, index) => (
          <motion.div
            key={index}
            className="bg-richblack-900 text-white border border-richblack-800  rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105"
          >
            <div className="flex items-start  p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300">
              <span className="text-3xl text-blue-400 mr-4 flex-shrink-0">
                {offering.icon}
              </span>
              <div className="flex flex-col justify-start">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {offering.title}
                </h3>
                <p className="text-gray-400 text-base">
                  {offering.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Offerings;
