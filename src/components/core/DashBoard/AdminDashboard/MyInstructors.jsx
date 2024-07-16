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
    <div className="p-4">
      <div className="sticky flex items-center flex-col lg:justify-between flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
        <h1 className="text-2xl font-bold p-2 lg:p-0 md:p-2 text-white">
          My Instructors
        </h1>
        <p className=" text-sm lg:text-md text-richblack-5">
          ⚡ Total Earnings: ₹{totalEarnings.toFixed(2)}
        </p>
      </div>
      <p className=" text-richblack-50 mt-4 text-md">
        Here you can manage your instructors <span className="text-xl">😄</span>
        .
      </p>

      <div className="text-white mt-5">
        <h1 className="text-2xl font-bold mb-2 text-yellow-50  ">
          Instructors List
        </h1>
        <ul>
          {instructors.map((instructor) => (
            <li key={instructor._id} className="mt-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{instructor.name}</h3>
                  <p className="text-sm mt-2">
                    Total Contribution of Instructor: ₹
                    {instructor.totalEarnings.toFixed(2)}
                  </p>
                  <ul className="ml-8 mt-3">
                    {instructor.courses.map((course) => (
                      <li key={course._id} className="mb-2">
                        <span className="text-md">
                          {course.name} - Earnings: ₹
                          {course.earnings.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="p-2 text-pink-200"
                  onClick={() => handleConfirmModal(instructor)}
                >
                  Delete Instructor
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {confirmationModal && (
        <ConfirmationModals modalData={confirmationModal} />
      )}
    </div>
  );
};

export default MyInstructors;
