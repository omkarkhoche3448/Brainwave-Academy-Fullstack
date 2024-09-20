const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute");
const profileRoute = require("./routes/profile");
const courseRoute = require("./routes/course");
const conatctRoute = require("./routes/contact");
const paymentRoutes = require("./routes/payment");

const cookieParser = require("cookie-parser");
const dbConnection = require("./config/database");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("./config/cloudinary");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

//connections
dbConnection();
cloudinary.cloudinaryConnect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/reach", conatctRoute);
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send(`Your Server Is Up and Running `);
});

app.listen(PORT, () => {
  console.log(`Server Listinig on the ${PORT} port`);
});
