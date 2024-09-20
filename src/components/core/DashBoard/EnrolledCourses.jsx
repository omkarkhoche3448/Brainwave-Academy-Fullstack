import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import convertSecondsToDuration from "../../../utils/secToDurationFrontend";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      // console.log("res:", res);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);

  function getTotalDuration(courseContent) {
    let totalDurationInSeconds = 0;

    courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        totalDurationInSeconds += parseFloat(subSection.timeDuration);
      });
    });

    return convertSecondsToDuration(totalDurationInSeconds);
  }

  return (
    <>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <div className=" w-full lg:h-[500px] flex items-center justify-center place-content-center text-2xl text-richblack-5">
          You have not enrolled in any course yet.
        </div>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="grid grid-cols-1 md:grid-cols-3 rounded-t-lg bg-richblack-500 justify-between items-center">
            <p className="px-5 py-3">Course Name</p>
            <p className="px-5 py-3">Duration</p>
            <p className="px-5 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => (
            <div
              className={`grid grid-cols-1 md:grid-cols-3 items-center justify-between border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex cursor-pointer items-center gap-4 px-5 py-3 md:col-span-1"
                onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  );
                }}
              >
                <img
                  src={course.thumbnail}
                  alt="course_img"
                  className="h-14 lg:w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{course.courseName}</p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>

              <div className="px-5 py-3 md:col-span-1">
                {getTotalDuration(course.courseContent)}
              </div>

              <div className="flex flex-col gap-2 px-5 py-3 md:col-span-1">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
