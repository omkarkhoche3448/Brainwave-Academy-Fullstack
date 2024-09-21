import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ConfirmationModals from "../../../common/ConfirmationModal";

const AddCourseCategory = () => {
  const [categories, setCategories] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null); // State for course deletion
  const [editingCategory, setEditingCategory] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/course/showAllCategories",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editingCategory) {
        await axios.put(
          `http://localhost:4000/api/v1/course/update/${editingCategory._id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          "http://localhost:4000/api/v1/course/createCategory",
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setValue("categoryName", "");
      setValue("description", "");
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error("Error creating/updating category:", error);
    }
  };

  const handleEdit = (category) => {
    setShowForm(true);
    setValue("categoryName", category.name);
    setValue("description", category.description);
    setEditingCategory(category);
  };

  const handleDeleteCourse = (categoryId, courseId) => {
    setDeletingCourse({ categoryId, courseId });
    setConfirmationModal({
      text1: "Are you sure?",
      text2: "This course will be deleted permanently.",
      btn1Text: "Delete",
      btn2Text: "Cancel",
      btn1Handler: () => deleteCourse(categoryId, courseId),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const deleteCourse = async (categoryId, courseId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/course/deleteCourse`, {
        data: { categoryId, courseId },
        headers: { Authorization: `Bearer ${token}` },
      });
      setConfirmationModal(null);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    setConfirmationModal(null);
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/course/deleteCategory/${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const toggleDropdown = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Form Toggle Button */}
      <div className="mb-4 text-center">
        <button
          className="px-4 py-2 bg-caribbeangreen-500 text-white rounded-md hover:bg-caribbeangreen-600 transition duration-300 ease-in-out"
          onClick={() => {
            setShowForm(!showForm);
            setEditingCategory(null);
          }}
        >
          {showForm ? "Close Form" : "Create New Category"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-800 p-6 rounded-md shadow-lg"
        >
          <div className="mb-4">
            <label
              className="block text-sm text-richblack-5 mb-1"
              htmlFor="categoryName"
            >
              Category Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="categoryName"
              placeholder="Category Name"
              {...register("categoryName", { required: true })}
              className="form-style w-full p-3 rounded-md border border-gray-700 bg-richblack-800 text-richblack-5"
            />
            {errors.categoryName && (
              <span className="text-xs text-pink-200 mt-1 block">
                Category Name is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-sm text-richblack-5 mb-1"
              htmlFor="description"
            >
              Category Description <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              {...register("description")}
              placeholder="Category Description"
              className="form-style w-full p-3 rounded-md border border-gray-700 bg-richblack-800 text-richblack-5"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            {editingCategory ? "Update Category" : "Add Category"}
          </button>
        </form>
      )}

      {/* Existing Categories */}
      <div className="text-white mt-6">
        <div className="sticky top-0 bg-richblack-800 p-6 rounded-md shadow-lg border border-richblack-700">
          <h2 className="text-xl font-bold mb-2">
            Existing Categories with Courses
          </h2>
          <p className="text-sm text-richblack-5">
            ⚡ Note: Click on a category name to see the courses
          </p>
        </div>

        <ul className="mt-6 space-y-4">
          {categories.map((category) => (
            <li
              key={category._id}
              className="bg-gray-800 p-4 rounded-md shadow-md border border-gray-700"
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-lg font-semibold text-white cursor-pointer hover:text-yellow-300 transition duration-300 ease-in-out"
                  onClick={() => toggleDropdown(category._id)}
                >
                  {category.name}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300 ease-in-out"
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "This Category will be deleted permanently.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteCategory(category._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    Delete Category
                  </button>
                </div>
              </div>

              {openCategory === category._id && (
                <ul className="mt-4 space-y-3">
                  {category.courses.map((course) => (
                    <li
                      key={course._id}
                      className="flex items-center justify-between bg-gray-700 p-4 rounded-md border border-gray-600"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={course.thumbnail}
                          alt={course.courseName}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="text-white">
                          <div className="text-md font-semibold">
                            {course.courseName}
                          </div>
                          <div className="text-sm text-gray-400">
                            by {course.instructor.email}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleDeleteCourse(category._id, course._id)
                        }
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                      >
                        Delete Course
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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

export default AddCourseCategory;
