import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ConfirmationModals from "../../../common/ConfirmationModal";

const AddCourseCategory = () => {
  const [categories, setCategories] = useState([]);
  const [ConfirmationModal, setConfirmationModal] = useState(null);
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
      console.log("Catagores course instructor", response.data.data);
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

  const handleDeleteCourse = async (categoryId, courseId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/course/deleteCourse`, {
        data: { categoryId, courseId },
        headers: { Authorization: `Bearer ${token}` },
      });
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
    <div className="p-4">
      <div className="mb-4">
        <button
          className="p-2  bg-caribbeangreen-500 text-white rounded hover:bg-caribbeangreen-600"
          onClick={() => {
            setShowForm(!showForm);
            setEditingCategory(null);
          }}
        >
          {showForm ? "Close Form" : "Create New Category"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 flex flex-col items-center p-3"
        >
          <div className="flex flex-col space-y-2 p-2">
            <label className="text-sm text-richblack-5" htmlFor="categoryName">
              Category Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              id="categoryName"
              placeholder="Category Name"
              {...register("categoryName", { required: true })}
              className="form-style w-full"
            />
            {errors.categoryName && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Category Name is required
              </span>
            )}
          </div>

          <div className="mb-3 flex flex-col space-y-2 p-2">
            <label className="text-sm text-richblack-5" htmlFor="description">
              Category Description <sup className="text-pink-200">*</sup>
            </label>
            <input
              type="text"
              {...register("description")}
              placeholder="Category Description"
              className="form-style"
            />
          </div>
          <button type="submit" className="p-2 bg-blue-500 text-white">
            {editingCategory ? "Update Category" : "Add Category"}
          </button>
        </form>
      )}

      <div className="text-white p-4 gap-3">
        <div className="sticky flex items-center flex-col lg:justify-between flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
          <h2 className="text-xl font-bold mb-2">
            Existing Categories with Courses
          </h2>
          <p className="text-[10px] lg:text-sm text-richblack-5">
            ⚡ Note: Click on to see the data
          </p>
        </div>

        <ul className="">
          {categories.map((category) => (
            <li key={category._id} className="mt-8">
              <div className="flex flex-row items-center  lg:justify-between gap-[3rem]">
                <span
                  className=" lg:text-lg font-semibold text-white cursor-pointer"
                  onClick={() => toggleDropdown(category._id)}
                >
                  {category.name}
                </span>
                <div className="flex items-center justify-evenly right-0">
                  <button
                    onClick={() => handleEdit(category)}
                    className="px-2 rounded hover:bg-yellow-600
                    border border-yellow-50 bg-transparent bg-yellow-50
                    cursor-pointer py-0 gap-x-2 font-semibold text-richblack-900"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="p-2 text-pink-200"
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "Your Category will be deleted permanently.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          dispatch(handleDeleteCategory(category._id)),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    Delete Category
                  </button>
                </div>
              </div>

              {openCategory === category._id && (
                <ul className="ml-8 mt-3">
                  {category.courses.map((course) => (
                    <li
                      key={course._id}
                      className="flex items-center justify-between mb-2"
                    >
                      <div
                        className="flex flex-col
                      ml-[-55px] lg:ml-0 lg:flex-row items-center space-x-3"
                      >
                        <img
                          src={course.thumbnail}
                          alt={course.thumbnail}
                          className="w-[150px] rounded-sm "
                        />
                        <span className="text-md flex flex-col gap-2 text-white">
                          {course.courseName} by {""}
                          <span className="text-[12px]">
                            ({course.instructor.email})
                          </span>
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          handleDeleteCourse(category._id, course._id)
                        }
                        className=" rounded hover:bg-yellow-600
                      border border-yellow-50 bg-transparent bg-yellow-50
                      cursor-pointer gap-x-2  py-2 px-3 font-semibold text-richblack-900"
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

      {/* Confirmation Modal */}
      {ConfirmationModal && (
        <ConfirmationModals modalData={ConfirmationModal} />
      )}
    </div>
  );
};

export default AddCourseCategory;
