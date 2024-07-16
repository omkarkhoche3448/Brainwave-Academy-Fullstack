const RatingAndReview = require("../models/ratingAndReview");
const Course = require("../models/course");
const { mongoose } = require("mongoose");

// Create Rating & Review 
exports.createRatingAndReview = async (req, res) => {
    try {
        //get user id
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user not Found"
            })
        }
        //fetchdata from req body
        const { rating, review, courseId } = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId } },
            });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: 'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: 'Course is already reviewed by the user',
            });
        }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating, review,
            course: courseId,
            user: userId,
        });

        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingAndReviews: ratingReview._id,
                }
            },
            { new: true });
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch (error) {
        console.log("Error while creating the review", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

// Get all Rating & Review 
exports.getAllRatingsAndReview = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName"
            })
            .exec();

        if (!allReviews) {
            return res.status(404).json({
                success: false,
                message: "No ratings and reviews found"
            });
        }

        return res.status(200).json({
            success: true,
            allReviews,
            message: "All ratings and reviews fetched successfully"
        });
    } catch (error) {
        console.error("Error while getting reviews:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// Get avg rating
exports.getAverageRating = async (req, res) => {
    try {
        const courseId = req.body.courseId;
        // console.log("Course ID:", courseId);

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ]);
        // console.log("Aggregation Result:", result); 

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Average Rating is 0, no ratings given till now',
            averageRating: 0,
        });
    }
    catch (error) {
        console.log("Error While getting avg Review:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//Get perticular course Rating & Review
exports.getReviewsForCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }

        const reviews = await RatingAndReview.find({ Course: courseId })
            .populate({
                path: "User",
                select: "firstName lastName email image"
            })
            .sort({ rating: "desc" })
            .exec();

        res.status(200).json({
            success: true,
            data: reviews,
            message: "Reviews for the course fetched successfully"
        });
    } catch (error) {
        console.error("Error while fetching reviews for course:", error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Internal server error"
        });
    }
};