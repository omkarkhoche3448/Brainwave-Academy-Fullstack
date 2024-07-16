const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Database Connected Successfully");
        })
        .catch((error) => {
            console.log("Issue while connecting to the database", error);
            process.exit(1);
        });
};

module.exports = dbConnection;
