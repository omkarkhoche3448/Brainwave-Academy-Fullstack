import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../../assets/Logo/brainwave-academy-logo-white-transparent.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 md:px-8 bottom-0">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex flex-col flex-shrink-0">
          <img src={Logo} alt="Footer Logo" className="w-[190px] h-auto mb-4" />
          <p className="text-sm">
            &copy; 2024 Brainwave Academy. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col flex-grow md:flex-row md:justify-center md:items-center gap-4">
          <a href="#" className="text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-sm">
            Terms Of Service
          </a>
          <a href="#" className="text-sm">
            Refund Policy
          </a>
          <a href="#" className="text-sm">
            Gift a Course
          </a>
          <a href="#" className="text-sm">
            Team
          </a>
          <a href="#" className="text-sm">
            Contact Us
          </a>
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-white">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="#" className="text-white">
            <FaTwitter className="text-2xl" />
          </a>
          <a href="#" className="text-white">
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
