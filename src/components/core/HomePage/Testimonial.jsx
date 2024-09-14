import React from "react";

const Testimonial = () => {
  const ProfilePhoto =
    "https://res.cloudinary.com/dkbzscmmq/image/upload/v1726342601/erlmaigli2ro6bhsylxr.webp";

  return (
    <div className=" text-white px-6">
      <div className="max-w-5xl mx-auto text-center">
        <blockquote className="text-lg italic mb-6">
          "The team at Brainwave Academy has been phenomenal! Their dedication
          to improving our educational platform was evident from day one. With
          their innovative solutions, we were able to enhance our learning
          experience, reaching over 4,519+ students seamlessly. The platform's
          ability to handle thousands of simultaneous users with ease was
          impressive. We couldn't have asked for a better partner in our mission
          to deliver quality education."
        </blockquote>
        <div className="flex justify-center mb-4">
          <img
            src={ProfilePhoto}
            alt="Omkar Khoche"
            className="rounded-full w-24 h-24 object-cover"
            loading="lazy"
          />
        </div>
        <cite className="block text-xl font-semibold mb-2">Omkar Khoche</cite>
        <p className="text-lg">Head of Product, Brainwave Academy</p>
      </div>
    </div>
  );
};

export default Testimonial;
