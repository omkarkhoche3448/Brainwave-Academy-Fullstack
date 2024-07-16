const Category = require("../models/Category");
const Course = require("../models/course")

exports.createCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body;
        if (!categoryName) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }
        const CategorysDetails = await Category.create({
            name: categoryName,
            description: description,
        });
        console.log(CategorysDetails);
        return res.status(200).json({
            success: true,
            message: "Categorys Created Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message,
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        // console.log("INSIDE SHOW ALL CATEGORIES");
        const allCategorys = await Category.find({});
        res.status(200).json({
            success: true,
            data: allCategorys,
        });

        // console.log("All Category:", allCategorys)
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const category = await Category.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        await Course.deleteMany({ _id: { $in: category.courses } });
        return res.status(200).json({
            success: true,
            message: "Category and related courses deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Show All Categories
exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({}).populate({
            path: 'courses',
            populate: {
                path: 'instructor',
                select: 'name email' // Adjust fields as needed
            }
        });
        res.status(200).json({
            success: true,
            data: allCategories,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



//categoryPageDetails
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        console.log("categoryId", categoryId);

        // Retrieve courses for the specified category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" }
            })
            .exec();

        // Handle the case when the category is not found
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        // Handle the case when there are no courses for the selected category
        if (selectedCategory.courses.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found for the selected category.",
            });
        }

        // Retrieve courses for another random category
        const differentCategories = await Category.find({ _id: { $ne: categoryId } });
        let randomCategory = null;
        let randomCategoryCourses = [];

        if (differentCategories.length > 0) {
            randomCategory = differentCategories[getRandomInt(differentCategories.length)];
            randomCategoryCourses = await Category.findById(randomCategory._id)
                .populate({
                    path: "courses",
                    match: { status: "Published" },
                })
                .exec();
        }

        // Populate the category name in the response
        const differentCourses = randomCategoryCourses
            ? {
                category: randomCategory.name,
                courses: randomCategoryCourses.courses
            }
            : [];

        // Retrieve top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor",
                },
            })
            .exec();

        // Flatten the array of courses from all categories into a single array
        const allCourses = allCategories.flatMap((category) => category.courses);

        // Sort the array of courses by the sold field in descending order to get the most sold courses
        const topSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10);

        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCourses,
                topSellingCourses
            },
        });

    } catch (error) {
        console.error("Error while fetching category page details:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


