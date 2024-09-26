import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/api";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const truncateWords = 15;

  const handleResize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1024) {
      setSlidesPerView(3);
    } else if (screenWidth >= 768) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(1);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        // console.log("Reviews of Course", data.allReviews);
        if (data?.success) {
          setReviews(data.allReviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="text-white w-full mx-auto lg:mt-12 mb-8">
      <h2 className="font-inter text-cnetre font-semibold text-2xl md:text-4xl mb-8">
        Reviews From Other Learners
      </h2>
      <div className="my-[50px] h-[184px] lg:max-w-maxContent mx-auto">
        <Swiper
          spaceBetween={25}
          slidesPerView={slidesPerView}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="lg:w-full w-[300px] md:w-[500px] h-[250px]"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col h-full lg:gap-3 bg-richblack-800 p-3 rounded-xl text-sm lg:text-[14px] text-richblack-25">
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={`https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                    alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <h2 className="lg:text-[14px] font-medium text-richblack-500">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>
                <p className="font-medium text-richblack-25">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")} ...`
                    : review?.review}
                </p>
                <div className="flex items-center w-[145px] gap-2">
                  <h3 className="font-semibold text-yellow-100">
                    {review.rating.toFixed(1)}
                  </h3>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
