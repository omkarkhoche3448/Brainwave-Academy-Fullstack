import React from "react";
import CountUp from "react-countup";

const Stats = () => {
  const stats = [
    { label: "Students Enrolled", value: 4519 },
    { label: "Courses Available", value: 120 },
    { label: "Instructors", value: 48 },
    { label: "Lessons Completed", value: 85204 },
  ];

  return (
    <div className="text-center w-full  text-white">
      <h2 className="text-3xl font-bold mb-16">
        Trusted by thousands of students and educators worldwide
      </h2>
      <br />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className="text-4xl font-bold mb-2">
              <CountUp
                start={1}
                end={stat.value}
                duration={2.5}
                separator=","
                enableScrollSpy
                scrollSpyDelay={100}
              />
              +
            </h3>
            <p className="text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
