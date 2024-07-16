const Profile = require("../models/profile");
const User = require("../models/user");
const Course = require("../models/course");


const { uploadImageToCloudinary } = require("../utils/imageUploder");
const dotenv = require('dotenv');
dotenv.config();

exports.updateProfile = async (req, res) => {
    try {
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "",
            about = "",
            contactNumber = "",
            gender = "",
        } = req.body

        const id = req.user.id
        console.log(id)

        const userDetails = await User.findById(id)
        const profile = await Profile.findById(userDetails.additionalDetails)

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        })
        await user.save()

        // Update the profile fields
        profile.dateOfBirth = dateOfBirth
        profile.about = about
        profile.contactNumber = contactNumber
        profile.gender = gender

        // Save the updated profile
        await profile.save()

        // Find the updated user details
        const updatedUserDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec()

        return res.json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    console.log("Omkar Updating the profile picture")
    try {
        const userId = req.user.id;
        const displayPicture = req.files && req.files.displayPicture;

        if (!userId || !displayPicture) {
            return res.status(400).json({
                success: false,
                message: "Fields Required"
            });
        }

        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        const updateUserDetails = await User.findOneAndUpdate(
            { _id: userId },
            { userImage: image.secure_url },
            { new: true }
        ).populate("additionalDetails")
            .exec()

        return res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updateUserDetails,
        });
    } catch (error) {
        console.log("Error while updating the Display Picture", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.deleteAccount = async (req, res) => {
    try {

        const id = req.user.id

        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "UserDetails Not Found"
            });
        }

        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

        await User.findOneAndDelete({ _id: id })

        await Course.updateMany({ studentsEnrolled: id },
            {
                $pull: { studentsEnrolled: id }
            }
        );

        return res.status(200).json({
            success: true,
            message: "Account Deleted Succesfully"
        });

    } catch (error) {
        console.error("Error while Deleting Account :", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

exports.updateUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const { newDetails } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: newDetails },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User details updated successfully",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error while updating user details:", error);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Issue while updating user details",
        });
    }
};

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec()
        console.log(userDetails)
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id: userId,
        }).populate({
            path: "Courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                    populate: {
                        path: "timeDuration"
                    }
                },
            },
        }).exec()

        console.log("userDetails:", userDetails)

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.Courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id })

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            // Create a new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return courseDataWithStats
        })

        res.status(200).json({ courses: courseData })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.deleteInstructor = async (req, res) => {
    try {
        const { instructorId } = req.params;

        // Find the instructor by ID
        const instructor = await User.findById(instructorId);

        if (!instructor) {
            return res.status(404).json({ success: false, message: 'Instructor not found' });
        }

        // Get all courses associated with the instructor
        const courses = await Course.find({ instructor: instructorId });

        // Unenroll students from each course
        for (let i = 0; i < courses.length; i++) {
            const course = courses[i];
            course.studentsEnrolled = [];
            await course.save();
        }

        // Delete each course and its associated subsections
        for (let i = 0; i < courses.length; i++) {
            const course = courses[i];
            const courseSections = await Section.find({ course: course._id });

            // Delete subsections of each section
            for (let j = 0; j < courseSections.length; j++) {
                const section = courseSections[j];
                await SubSection.deleteMany({ section: section._id });
            }

            // Delete sections of the course
            await Section.deleteMany({ course: course._id });

            // Delete the course
            await Course.findByIdAndDelete(course._id);
        }

        // Finally, delete the instructor
        await instructor.remove();

        res.status(200).json({ success: true, message: 'Instructor and associated courses deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.getInstructorsWithEarnings = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortField = 'totalEarnings', sortOrder = 'desc', minEarnings } = req.query;
        const skip = (page - 1) * limit;

        const sortOptions = {};
        sortOptions[sortField] = sortOrder === 'desc' ? -1 : 1;

        const filter = {};
        if (minEarnings) {
            filter.totalEarnings = { $gte: parseInt(minEarnings) };
        }

        const instructors = await User.find({ accountType: 'Instructor', ...filter })
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .populate('Courses');

        const instructorData = await Promise.all(
            instructors.map(async (instructor) => {
                const courses = await Course.find({ instructor: instructor._id });
                const totalEarnings = courses.reduce((acc, course) => acc + (course.studentsEnrolled.length * course.price), 0);

                return {
                    _id: instructor._id,
                    name: `${instructor.firstName} ${instructor.lastName}`,
                    courses: courses.map(course => ({
                        _id: course._id,
                        name: course.courseName,
                        earnings: course.studentsEnrolled.length * course.price,
                    })),
                    totalEarnings,
                };
            })
        );

        // Sorting the instructorData based on totalEarnings
        instructorData.sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.totalEarnings - a.totalEarnings;
            } else {
                return a.totalEarnings - b.totalEarnings;
            }
        });

        res.status(200).json({ success: true, data: instructorData });
    } catch (error) {
        console.error("Error fetching instructors with earnings:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Revenue Trend API
exports.getRevenueTrends = async (req, res) => {
    try {
        const revenueData = await Course.aggregate([
            {
                $unwind: "$studentsEnrolled"
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalRevenue: { $sum: "$price" }
                }
            },
            {
                $sort: { "_id.month": 1 }
            }
        ]);
        res.status(200).json(revenueData.map(data => ({
            month: new Date(0, data._id.month - 1).toLocaleString('default', { month: 'long' }),
            revenue: data.totalRevenue
        })));
    } catch (error) {
        console.error('Error fetching revenue data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Students Over Time API
exports.getStudentsOvertime = async (req, res) => {
    try {
        const studentData = await User.aggregate([
            {
                $match: { accountType: 'Student' }
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    students: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.month": 1 }
            }
        ]);
        res.status(200).json(studentData.map(data => ({
            date: new Date(0, data._id.month - 1).toLocaleString('default', { month: 'long' }),
            students: data.students
        })));
    } catch (error) {
        console.error('Error fetching student data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Trending Courses API
exports.getTrendingCourses = async (req, res) => {
    try {
        const courseData = await Course.aggregate([
            {
                $unwind: "$studentsEnrolled"
            },
            {
                $group: {
                    _id: "$_id",
                    name: { $first: "$courseName" },
                    sales: { $sum: 1 }
                }
            },
            {
                $sort: { sales: -1 }
            },
            {
                $limit: 5
            }
        ]);
        res.status(200).json(courseData);
    } catch (error) {
        console.error('Error fetching course data:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

