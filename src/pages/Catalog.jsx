import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/api";
import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { Link } from "react-router-dom";
import Error from "./Error";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category = res?.data?.data?.find(
          (ct) =>
            ct.name.split(" ").join("-").toLowerCase() ===
            catalogName.split(" ").join("-").toLowerCase()
        );
        setCategoryId(category?._id);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      if (!categoryId) return;
      setLoading(true);
      try {
        const res = await getCatalogaPageData(categoryId);
        if (res.success) {
          setCatalogPageData(res.data);
        } else {
          setCatalogPageData(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching category details:", error);
        setLoading(false);
      }
    };
    getCategoryDetails();
  }, [categoryId]);

  if (loading) {
    return;
    <div className="flex h-screen items-center justify-center">
      <div className="spinner" />
    </div>;
  }

  if (!catalogPageData) {
    <div className="text-center text-xl text-richblack-300 my-8">
      No Courses for the category
    </div>;
  }

  return (
    <>
      <div className="bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-richblack-300">
            <Link to="/">Home</Link>
            {"/ Catalog /"}
            <span className="text-yellow-25">
              {catalogPageData?.selectedCategory.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.selectedCategory.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.selectedCategory.description}
          </p>
        </div>
      </div>

      <div>
        {/* Section 1 */}
        <div className="container mx-auto px-4 lg:max-w-maxContent">
          <div className="text-xl font-semibold mb-4">
            Courses to get you started
          </div>
          <div className="flex border-b border-b-richblack-600 text-sm mb-4">
            <p
              className={`px-4 py-2 ${
                active === 1
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              } cursor-pointer`}
              onClick={() => setActive(1)}
            >
              Most Popular
            </p>
            <p
              className={`px-4 py-2 ${
                active === 2
                  ? "border-b border-b-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              } cursor-pointer`}
              onClick={() => setActive(2)}
            >
              New
            </p>
          </div>
          <CourseSlider Courses={catalogPageData?.selectedCategory.courses} />
        </div>

        {/* Section 2 */}
        {catalogPageData?.differentCourses.courses && (
          <div className="container mx-auto px-4 py-12 lg:max-w-maxContent">
            <div className="text-xl text-white font-semibold mb-4">
              Checkout {catalogPageData?.differentCourses.category} Courses
            </div>
            <CourseSlider Courses={catalogPageData?.differentCourses.courses} />
          </div>
        )}

        {/* Section 3 */}
        <div className="container mx-auto px-4  lg:max-w-maxContent">
          <div className="text-xl  text-white font-semibold mb-4">
            Most Selling Courses
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.topSellingCourses.length === 0 ? (
              <p className="text-xl text-white text-center">
                No Most selling courses
              </p>
            ) : (
              catalogPageData?.topSellingCourses
                ?.slice(0, 4)
                .map((course, index) => (
                  <Course_Card
                    course={course}
                    key={index}
                    Height={"h-[400px]"}
                  />
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
