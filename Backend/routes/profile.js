const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middleware/authZ")
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard,
    getInstructorsWithEarnings,
    deleteInstructor,
    getRevenueTrends,
    getStudentsOvertime,
    getTrendingCourses
} = require("../Controller/Profile")


router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)
router.get("/getInstructorsWithEarnings", auth, getInstructorsWithEarnings);
router.delete("/deleteInstructor/:instructorId", auth, deleteInstructor);

router.get("/revenue-trend", getRevenueTrends)
router.get("/students-over-time", getStudentsOvertime)
router.get("/trending-courses", getTrendingCourses)

module.exports = router


