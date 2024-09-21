import React from "react";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { FaEarthAfrica } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

const contactDetails = [
  {
    title: "Chat with Us",
    description: "Our friendly team is here to help.",
    contact: "@mail address",
    icon: <HiMiniChatBubbleLeftRight className="w-6 h-6" />,
  },
  {
    title: "Visit Us",
    description: "Come and say hello at our office HQ.",
    contact: "Here is the location/ address",
    icon: <FaEarthAfrica className="w-6 h-6" />,
  },
  {
    title: "Call Us",
    description: "Mon - Fri From 8am to 5pm",
    contact: "+123 456 7890",
    icon: <IoCall className="w-6 h-6" />,
  },
];

function ContactDetails() {
  return (
    <div className="flex flex-col gap-9 bg-richblack-800 p-9 rounded-xl">
      {contactDetails.map(({ title, description, contact, icon }, index) => (
        <div
          key={title}
          className="flex flex-row w-full h-[98px] pt-3 gap-2 justify-start"
        >
          {icon}
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">{title}</p>
            <div className="text-richblack-300">
              <p className="text-md">{description}</p>
              <p className="text-md">{contact}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactDetails;
