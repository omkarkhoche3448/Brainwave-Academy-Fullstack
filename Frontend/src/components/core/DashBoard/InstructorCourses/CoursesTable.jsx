import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { formatDate } from "../../../../services/formatDate";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import { COURSE_STATUS } from "../../../../utils/constant";
import ConfirmationModal from "../../../common/ConfirmationModal";
import convertSecondsToDuration from "../../../../utils/secToDurationFrontend";

function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 10;

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourse(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  function getDuration(course) {
    let totalDurationInSeconds = 0;
    course.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    return totalDuration;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full rounded-xl border border-richblack-800">
          <thead>
            <tr className="text-left bg-richblack-800 text-richblack-100">
              <th className="p-2">Courses</th>
              <th className="p-2 hidden lg:table-cell">Duration</th>
              <th className="p-2">Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses?.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-2 text-center">
                  No courses found
                </td>
              </tr>
            ) : (
              courses?.map((course) => (
                <tr key={course._id} className=" text-richblack-100">
                  <td className="p-2">
                    <div className="flex-col lg:flex space-y-4">
                      <img
                        src={course?.thumbnail}
                        alt={course?.courseName}
                        className="h-20 w-32 object-cover mr-4"
                      />
                      <div>
                        <p className="font-semibold">{course.courseName}</p>
                        <p className="text-sm">
                          {course.courseDescription.split(" ").length >
                          TRUNCATE_LENGTH
                            ? course.courseDescription
                                .split(" ")
                                .slice(0, TRUNCATE_LENGTH)
                                .join(" ") + "..."
                            : course.courseDescription}
                        </p>
                        <p className="text-xs">
                          Created: {formatDate(course.createdAt)}
                        </p>
                        <p className="text-xs p-2">
                          {course.status === COURSE_STATUS.DRAFT ? (
                            <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Drafted
                            </span>
                          ) : (
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Published
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 hidden lg:table-cell">
                    {getDuration(course)}
                  </td>
                  <td className="p-2">₹{course.price}</td>
                  <td className="p-2">
                    <button
                      disabled={loading}
                      onClick={() => {
                        navigate(`/dashboard/edit-course/${course._id}`);
                      }}
                      title="Edit"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        });
                      }}
                      title="Delete"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CoursesTable;
