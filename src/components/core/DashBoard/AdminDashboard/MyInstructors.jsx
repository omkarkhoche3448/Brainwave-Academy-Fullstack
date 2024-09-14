import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ConfirmationModals from "../../../common/ConfirmationModal";
import toast from "react-hot-toast";

const MyInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/profile/getInstructorsWithEarnings",
        {
          params: {
            page: 1,
            limit: 10,
            sortField: "totalEarnings",
            sortOrder: "desc",
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("getInstructorsWithEarnings", response.data.data);
      setInstructors(response.data.data);
      calculateTotalEarnings(response.data.data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  };

  const handleDeleteInstructor = async (instructorId) => {
    setConfirmationModal(null);
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/profile/deleteInstructor/${instructorId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchInstructors();
      toast.success("Instructor Deleted Succesfuly");
    } catch (error) {
      console.error("Error deleting instructor:", error);
    }
  };

  const handleConfirmModal = (instructor) => {
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "The instructor will be deleted permanently.",
      btn1Text: "Delete",
      btn2Text: "Cancel",
      btn1Handler: () => handleDeleteInstructor(instructor._id),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const calculateTotalEarnings = (instructorsData) => {
    const total = instructorsData.reduce(
      (acc, instructor) => acc + instructor.totalEarnings,
      0
    );
    setTotalEarnings(total);
  };

  return (
    <div className="p-4 lg:p-6 bg-richblack-900 min-h-screen">
      {/* Header Section */}
      <div className="  flex flex-col items-center bg-richblack-800 border border-richblack-700 rounded-md p-4 lg:p-6 mb-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
          My Instructors
        </h1>
        <p className="text-sm lg:text-md text-richblack-200">
          ⚡ Total Earnings: ₹{totalEarnings.toFixed(2)}
        </p>
      </div>

      {/* Instructors List */}
      <div className="mt-5 text-white">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-yellow-50">
          Instructors List
        </h2>
        <ul className="space-y-4">
          {instructors.map((instructor) => (
            <li
              key={instructor._id}
              className="bg-richblack-800 border border-richblack-700 rounded-md p-4 lg:p-6"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold mb-2">
                    {instructor.name}
                  </h3>
                  <p className="text-sm lg:text-base mb-2">
                    Total Contribution of Instructor: ₹
                    {instructor.totalEarnings.toFixed(2)}
                  </p>
                  <ul className="ml-0 lg:ml-8 mt-2 lg:mt-4 space-y-2">
                    {instructor.courses.map((course) => (
                      <li key={course._id} className="text-sm lg:text-base">
                        {course.name} - Earnings: ₹{course.earnings.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="mt-4 lg:mt-0 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
                  onClick={() => handleConfirmModal(instructor)}
                >
                  Delete Instructor
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmation Modal */}
      {confirmationModal && (
        <ConfirmationModals modalData={confirmationModal} />
      )}
    </div>
  );
};

export default MyInstructors;
