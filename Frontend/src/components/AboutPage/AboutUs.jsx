import React from "react";
import HighlightText from "../core/HomePage/HighlightText";

const AboutUs = () => {
  return (
    <div className="bg-richblack-900 text-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Introduction */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <HighlightText text={"Brainwave Academy"} />
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-richblack-300 max-w-3xl mx-auto">
            Brainwave Academy is a leading online education platform committed
            to providing high-quality courses to learners worldwide. Our
            platform was founded by a team of passionate educators and
            technologists with the vision of democratizing education and
            empowering individuals to unlock their full potential.
          </p>
        </section>

        {/* Mission and Vision */}
        <section className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
            Our Mission
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-richblack-300 max-w-2xl mx-auto mb-8">
            Our mission is to revolutionize the way people learn by providing
            engaging, interactive, and personalized learning experiences.
            Whether you're a beginner looking to explore a new skill or a
            professional aiming to advance your career, Brainwave Academy has
            something for everyone.
          </p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
            Our Vision
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-richblack-300 max-w-2xl mx-auto">
            We envision a future where access to high-quality education is
            universal and learning knows no boundaries. Our vision is to create
            a world where anyone, anywhere, can pursue their passions, fulfill
            their aspirations, and contribute to the global community through
            lifelong learning.
          </p>
        </section>

        {/* Values */}
        <section className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
            Our Values
          </h2>
          <ul className="text-base md:text-lg lg:text-xl text-richblack-300 list-disc list-inside max-w-2xl mx-auto space-y-2">
            <li>Accessibility: Making education accessible to all.</li>
            <li>Quality: Providing high-quality, engaging content.</li>
            <li>Innovation: Embracing innovation in teaching and learning.</li>
            <li>
              Community: Fostering a supportive and inclusive learning
              community.
            </li>
            <li>Growth: Empowering learners to grow and succeed.</li>
          </ul>
        </section>

        {/* Team */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4">
            Meet Our Team
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-richblack-300 max-w-2xl mx-auto">
            Behind Brainwave Academy is a diverse team of passionate individuals
            dedicated to transforming education and empowering learners
            worldwide. Get to know the faces behind our platform and discover
            the expertise and dedication that drives our mission forward.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
