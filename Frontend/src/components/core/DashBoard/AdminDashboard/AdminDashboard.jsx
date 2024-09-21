import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";

const AdminDashboard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [selectedChart, setSelectedChart] = useState(null); // Track selected chart

  useEffect(() => {
    fetchRevenueData();
    fetchStudentData();
    fetchTrendingCourses();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/profile/revenue-trend"
      );
      setRevenueData(response.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/profile/students-over-time"
      );
      setStudentData(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const fetchTrendingCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/profile/trending-courses"
      );
      setTrendingCourses(response.data);
    } catch (error) {
      console.error("Error fetching trending courses:", error);
    }
  };

  const handleChartClick = (chartType) => {
    setSelectedChart(chartType === selectedChart ? null : chartType);
  };

  const renderChart = () => {
    switch (selectedChart) {
      case "revenue":
        return (
          <ChartComponent
            type="bar"
            data={revenueData}
            labelKey="month"
            dataKey="revenue"
          />
        );
      case "students":
        return (
          <ChartComponent
            type="line"
            data={studentData}
            labelKey="date"
            dataKey="students"
          />
        );
      case "trending":
        return (
          <ChartComponent
            type="bar"
            data={trendingCourses}
            labelKey="name"
            dataKey="sales"
          />
        );
      default:
        return (
          <p className="text-md text-richblack-400">
            Select a chart to view details.
          </p>
        );
    }
  };

  return (
    <div className="p-6 bg-richblack-900 text-white min-h-screen">
      {/* Dashboard Header */}
      <div className="sticky top-0 flex flex-col items-start lg:flex-row lg:justify-between lg:items-center bg-richblack-800 rounded-md border border-richblack-700 p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-xs lg:text-sm text-richblack-400 mt-2 lg:mt-0">
          ⚡ Click on the sections below to view detailed data
        </p>
      </div>

      {/* Charts Row */}
      <div className="flex overflow-x-auto gap-6 mt-8">
        {/* Revenue Trend Section */}
        <div
          className="flex-1 bg-richblack-800 p-4 rounded-lg shadow-lg cursor-pointer"
          onClick={() => handleChartClick("revenue")}
        >
          <h2 className="text-2xl font-semibold mb-4 text-yellow-50">
            Revenue Trend
          </h2>
        </div>

        {/* Number of Students Over Time Section */}
        <div
          className="flex-1 bg-richblack-800 p-4 rounded-lg shadow-lg cursor-pointer"
          onClick={() => handleChartClick("students")}
        >
          <h2 className="text-2xl font-semibold mb-4 text-yellow-50">
            Number of Students Over Time
          </h2>
        </div>

        {/* Trending Courses Section */}
        <div
          className="flex-1 bg-richblack-800 p-4 rounded-lg shadow-lg cursor-pointer"
          onClick={() => handleChartClick("trending")}
        >
          <h2 className="text-2xl font-semibold mb-4 text-yellow-50">
            Trending Courses
          </h2>
        </div>
      </div>

      {/* Chart Result Display */}
      <div className="mt-8 bg-richblack-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-50">
          {selectedChart
            ? `Showing Results for ${
                selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)
              }`
            : "Select a chart to view details"}
        </h2>
        {renderChart()}
      </div>
    </div>
  );
};

export default AdminDashboard;
