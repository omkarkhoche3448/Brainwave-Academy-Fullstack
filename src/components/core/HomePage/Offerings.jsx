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
    icon: <FaGraduationCap className="w-8 h-8 text-white" />,
  },
  {
    title: "Expert Guidance",
    description: "Learn everything from the best in the industry experts.",
    icon: <FaUsers className="w-8 h-8 text-white" />,
  },
  {
    title: "Certificate On Completion",
    description: "After completing the course, you'll receive a certificate.",
    icon: <FaCertificate className="w-8 h-8 text-white" />,
  },
  {
    title: "Closed Premium Community",
    description:
      "Once enrolled in the course, get access to the premium NamasteDev community.",
    icon: <FaUsers className="w-8 h-8 text-white" />,
  },
  {
    title: "Project Based Learning",
    description:
      "Learn everything from scratch by building super-cool projects.",
    icon: <FaTools className="w-8 h-8 text-white" />,
  },
  {
    title: "In Depth High Quality Videos",
    description:
      "Get access to all the high quality videos at your fingertips.",
    icon: <FaVideo className="w-8 h-8 text-white" />,
  },
];

const Offerings = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[320px] md:grid md:w-11/12 lg:w-11/12 lg:mx-auto flex flex-col  ml-11 lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {offerings.map((offering, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className=" bg-richblack-700 rounded-lg shadow-md p-6 font-inter"
        >
          <div className="flex items-center text-black justify-center mb-4 ">
            {offering.icon}
          </div>
          <h3 className="text-xl font-semibold font-inter mb-2">
            {offering.title}
          </h3>
          <p className="text-gray-600 text-xl">{offering.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Offerings;
