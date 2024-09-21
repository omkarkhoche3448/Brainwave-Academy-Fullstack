import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/verifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/common/Footer";
import Contact from "./pages/Contact";
import About from "./pages/About";
import MyProfile from "./components/core/DashBoard/MyProfile";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constant";
import Settings from "./components/core/DashBoard/Settings/Settings";
import EnrolledCourses from "./components/core/DashBoard/EnrolledCourses";
import Cart from "./components/core/DashBoard/Cart/cart";
import AddCourse from "./components/core/DashBoard/AddCourse/index";
import Instructor from "./components/core/DashBoard/InstructorDashboard/Instructor";
import MyCourses from "./components/core/DashBoard/MyCourses";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import EditCourse from "./components/core/DashBoard/EditCourse/EditCourse";
import MyInstructors from "./components/core/DashBoard/AdminDashboard/MyInstructors";
import AddCourseCategory from "./components/core/DashBoard/AdminDashboard/AddCourseCategory";
import AdminDashboard from "./components/core/DashBoard/AdminDashboard/AdminDashboard";

function App() {
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(true);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    const hasShownSplashScreen = localStorage.getItem("shownSplashScreen");
    if (hasShownSplashScreen) {
      setShowSplashScreen(false);
    } else {
      localStorage.setItem("shownSplashScreen", "true");
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {showSplashScreen && <SplashScreen />}
      {!showSplashScreen && (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="catalog/:catalogName" element={<Catalog />} />
            <Route path="courses/:courseId" element={<CourseDetails />} />
            <Route
              path="signup"
              element={
                <OpenRoute>
                  <Signup />
                </OpenRoute>
              }
            />
            <Route
              path="login"
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              }
            />
            <Route
              path="verify-email"
              element={
                <OpenRoute>
                  <VerifyEmail />
                </OpenRoute>
              }
            />
            <Route
              path="forgot-password"
              element={
                <OpenRoute>
                  <ForgotPassword />
                </OpenRoute>
              }
            />
            <Route
              path="update-password/:id"
              element={
                <OpenRoute>
                  <UpdatePassword />
                </OpenRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="dashboard/my-profile" element={<MyProfile />} />
              <Route path="dashboard/settings" element={<Settings />} />
              {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="dashboard/cart" element={<Cart />} />
                  <Route
                    path="dashboard/enrolled-courses"
                    element={<EnrolledCourses />}
                  />
                </>
              )}
              {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="dashboard/instructor" element={<Instructor />} />
                  <Route path="dashboard/add-course" element={<AddCourse />} />
                  <Route path="dashboard/my-courses" element={<MyCourses />} />
                  <Route
                    path="dashboard/edit-course/:courseId"
                    element={<EditCourse />}
                  />
                </>
              )}
              {user?.accountType === ACCOUNT_TYPE.ADMIN && (
                <>
                  <Route path="dashboard/admin" element={<AdminDashboard />} />
                  <Route
                    path="dashboard/add-courseCategory"
                    element={<AddCourseCategory />}
                  />
                  <Route
                    path="dashboard/my-instructors"
                    element={<MyInstructors />}
                  />
                </>
              )}
            </Route>
            <Route
              element={
                <PrivateRoute>
                  <ViewCourse />
                </PrivateRoute>
              }
            >
              {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route
                    path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                    element={<VideoDetails />}
                  />
                </>
              )}
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
