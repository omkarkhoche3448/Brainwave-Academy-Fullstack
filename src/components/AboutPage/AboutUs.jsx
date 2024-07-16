import React from "react";
import HighlightText from "../core/HomePage/HighlightText";

const AboutUs = () => {
  return (
    <div className="mx-auto md:[350px] lg:w-full flex flex-col justify-center items-center gap-9 mt-6">
      {/* Introduction */}
      <section className="   text-center py-2">
        <h1 className="text-4xl font-semibold mx-auto">
          <HighlightText text={" Brainwave Academy"} />
        </h1>
        <p className="p-2 text-base tracking-tight font-medium text-richblack-300 mt-3">
          Brainwave Academy is a leading online education platform committed to
          providing high-quality courses to learners worldwide. Our platform was
          founded by a team of passionate educators and technologists with the
          vision of democratizing education and empowering individuals to unlock
          their full potential.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="max-w-[900px]  text-center ">
        <h2 className="text-2xl font-semibold">Our Mission</h2>
        <p className="text-base font-medium text-richblack-300 p-2">
          Our mission is to revolutionize the way people learn by providing
          engaging, interactive, and personalized learning experiences. Whether
          you're a beginner looking to explore a new skill or a professional
          aiming to advance your career, Brainwave Academy has something for
          everyone.
        </p>
        <h2 className="text-2xl font-semibold">Our Vision</h2>
        <p className="text-base font-medium text-richblack-300 p-2">
          We envision a future where access to high-quality education is
          universal and learning knows no boundaries. Our vision is to create a
          world where anyone, anywhere, can pursue their passions, fulfill their
          aspirations, and contribute to the global community through lifelong
          learning.
        </p>
      </section>

      {/* Values */}
      <section className="max-w-[900px] gap-3">
        <h2 className="text-2xl text-center font-semibold">Our Values</h2>

        <ul className="text-base font-medium text-richblack-300 list-disc left-0 p-2">
          <li>Accessibility: Making education accessible to all.</li>
          <li>Quality: Providing high-quality, engaging content.</li>
          <li>Innovation: Embracing innovation in teaching and learning.</li>
          <li>
            Community: Fostering a supportive and inclusive learning community.
          </li>
          <li>Growth: Empowering learners to grow and succeed.</li>
        </ul>
      </section>

      {/* Team */}
      <section className="max-w-[900px]  text-center">
        <h2 className="text-2xl font-semibold">Meet Our Team</h2>
        <p className="text-base font-medium text-richblack-300 p-2">
          Behind Brainwave Academy is a diverse team of passionate individuals
          dedicated to transforming education and empowering learners worldwide.
          Get to know the faces behind our platform and discover the expertise
          and dedication that drives our mission forward.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
