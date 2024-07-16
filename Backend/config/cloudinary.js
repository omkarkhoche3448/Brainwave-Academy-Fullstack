const cloudinary = require('cloudinary').v2

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDE_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRATE
        });
        console.log("Cloudinary connected succesfully")
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
    }
}