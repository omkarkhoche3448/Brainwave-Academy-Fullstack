import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart type
  const [currChartType, setCurrChartType] = useState("pie");

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Total Students Enrolled",
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: generateRandomColors(courses.length),
        borderColor: generateRandomColors(courses.length),
        borderWidth: 1,
      },
    ],
  };

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Total Income Generated",
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: generateRandomColors(courses.length),
        borderColor: generateRandomColors(courses.length),
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Helper function to render the selected chart type
  const renderChart = () => {
    const data =
      currChartType === "students" ? chartDataStudents : chartIncomeData;

    switch (currChartType) {
      case "pie":
        return <Pie data={data} options={options} />;
      case "bar":
        return <Bar data={data} options={options} />;
      case "line":
        return <Line data={data} options={options} />;
      default:
        return <Pie data={data} options={options} />;
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChartType("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChartType === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChartType("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChartType === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="space-x-4 font-semibold mt-4">
        {/* Buttons to switch between chart types */}
        <button
          onClick={() => setCurrChartType("bar")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChartType === "bar"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Bar
        </button>
        <button
          onClick={() => setCurrChartType("line")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChartType === "line"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Line
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full mt-4">
        {/* Render the selected chart */}
        {renderChart()}
      </div>
    </div>
  );
}
