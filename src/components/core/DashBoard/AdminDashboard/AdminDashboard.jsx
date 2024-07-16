import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";

const AdminDashboard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [showRevenueChart, setShowRevenueChart] = useState(false);
  const [showStudentChart, setShowStudentChart] = useState(false);
  const [showTrendingCoursesChart, setShowTrendingCoursesChart] =
    useState(false);

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

  const toggleRevenueChart = () => setShowRevenueChart(!showRevenueChart);
  const toggleStudentChart = () => setShowStudentChart(!showStudentChart);
  const toggleTrendingCoursesChart = () =>
    setShowTrendingCoursesChart(!showTrendingCoursesChart);

  return (
    <div className="p-4 text-white">
      <div className="sticky flex items-center flex-col lg:justify-between flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-[10px] lg:text-sm text-richblack-5">
          ⚡ Note: Click to see the data
        </p>
      </div>

      <div className="mt-8">
        <h2
          className="text-xl font-bold mb-2 text-yellow-50 cursor-pointer"
          onClick={toggleRevenueChart}
        >
          Revenue Trend
        </h2>

        {showRevenueChart && (
          <ChartComponent
            type="bar"
            data={revenueData}
            labelKey="month"
            dataKey="revenue"
          />
        )}
      </div>

      <div className="mt-8">
        <h2
          className="text-xl font-bold mb-2 text-yellow-50 cursor-pointer"
          onClick={toggleStudentChart}
        >
          Number of Students Over Time
        </h2>
        {showStudentChart && (
          <ChartComponent
            type="line"
            data={studentData}
            labelKey="date"
            dataKey="students"
          />
        )}
      </div>

      <div className="mt-8">
        <h2
          className="text-xl font-bold mb-2 text-yellow-50 cursor-pointer"
          onClick={toggleTrendingCoursesChart}
        >
          Trending Courses
        </h2>
        {showTrendingCoursesChart && (
          <ChartComponent
            type="bar"
            data={trendingCourses}
            labelKey="name"
            dataKey="sales"
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
