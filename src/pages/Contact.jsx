import React from "react";
import { motion } from "framer-motion";
import ContactDetails from "../components/ContactPage/ContactDetails";
import ContactUsForm from "../components/common/ContactUsForm";
import ReviewSlider from "../components/common/ReviewSlider";

function Contact() {
  return (
    <div>
      <div className="lg:w-[1200px] md:w-[700px] w-[359px] flex flex-col lg:flex-row justify-center mx-auto mt-12 gap-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white lg:w-[60%]"
        >
          <ContactDetails />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border rounded-lg border-solid border-richblack-600 py-8 p-12 gap-32 rounded-tl-lg"
        >
          <div className="text-4xl font-semibold text-white font-inter leading-10 tracking-tight text-left">
            Got a Idea? We’ve got the skills. Let’s team up
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-richblack-300 font-inter text-md mt-3"
          >
            Tell us more about yourself and what you’re got in mind.
          </motion.p>
          <ContactUsForm />
        </motion.div>
      </div>
      <ReviewSlider />
    </div>
  );
}

export default Contact;
