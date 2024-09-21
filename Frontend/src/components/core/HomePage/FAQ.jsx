import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "What types of courses do you offer?",
      answer:
        "We offer a wide range of courses including programming, data science, digital marketing, design, and more. Our courses are designed to cater to different skill levels, from beginners to advanced professionals.",
    },
    {
      question: "How can I enroll in a course?",
      answer:
        "To enroll in a course, simply browse our course catalog, select the course you’re interested in, and click on the 'Enroll Now' button. You’ll be guided through the enrollment process.",
    },
    {
      question: "Do you offer certificates upon completion?",
      answer:
        "Yes, upon successful completion of a course, you will receive a certificate that you can add to your resume or LinkedIn profile.",
    },
    {
      question: "Are the courses self-paced or scheduled?",
      answer:
        "Most of our courses are self-paced, allowing you to learn at your own convenience. However, we also offer some instructor-led courses with scheduled sessions.",
    },
    {
      question: "What is the cost of the courses?",
      answer:
        "Our courses vary in price. You can find detailed pricing information on each course page. We also offer discounts and financial aid options for eligible students.",
    },
    {
      question: "Can I get a refund if I’m not satisfied with the course?",
      answer:
        "Yes, we offer a refund policy. If you’re not satisfied with the course, please contact our support team within the first 14 days for a full refund.",
    },
  ];

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className=" text-white  px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-richblack-400 pb-4">
              <div
                className="flex text-center justify-between cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                {expandedIndex === index ? (
                  <FaMinus className="text-yellow-300" />
                ) : (
                  <FaPlus className="text-yellow-300" />
                )}
              </div>
              <div className="mt-3 ">
                {expandedIndex === index && (
                  <p className="text-base">{faq.answer}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-base">
            Still confused? Feel free to contact us at{" "}
            <a href="mailto:support@automatic.chat" className="text-yellow-300">
              support@brainwaveacademy.chat
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
