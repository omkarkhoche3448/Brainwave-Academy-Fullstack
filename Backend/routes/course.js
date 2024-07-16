
const express = require("express")
const router = express.Router();

const { auth, isInstructor, isStudent, isAdmin } = require("../middleware/authZ")

// Course
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
    getCoursesByCategory
} = require("../Controller/course")

// Catagory
const {
    showAllCategories,
    createCategory,
    getCategoryPageDetails,
    updateCategory,
    deleteCategory
} = require("../Controller/category")

// section
const {
    createSection,
    deleteSection,
    updateSection
} = require('../Controller/section');

// SubSection
const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require('../Controller/subSection');

// Rating and review
const {
    createRatingAndReview,
    getAverageRating,
    getAllRatingsAndReview
} = require('../Controller/ratingReview');

const {
    updateCourseProgress
} = require("../Controller/courseProgress");


// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);



// router.get('/getEnrolledCourses', auth, getEnrolledCourses)

router.post("/createCategory", createCategory)
router.put("/update/:id", updateCategory);
router.delete("/deleteCategory/:id", deleteCategory);
router.get('/getCoursesByCategory/:categoryId', getCoursesByCategory);
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", getCategoryPageDetails)



router.post('/addSection', auth, isInstructor, createSection);
router.post('/updateSection', auth, isInstructor, updateSection);
router.post('/deleteSection', auth, isInstructor, deleteSection);


router.post('/addSubSection', auth, isInstructor, createSubSection);
router.post('/updateSubSection', auth, isInstructor, updateSubSection);
router.post('/deleteSubSection', auth, isInstructor, deleteSubSection);


router.post('/createRating', auth, createRatingAndReview);
router.get('/getAverageRating', getAverageRating);
router.get('/getReviews', getAllRatingsAndReview);

module.exports = router;