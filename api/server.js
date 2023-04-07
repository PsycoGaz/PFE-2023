import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./Routes/user.route.js";
import messageRoute from "./Routes/message.route.js";
import gigRoute from "./Routes/gig.route.js";
import reviewRoute from "./Routes/review.route.js";
import conversationRoute from "./Routes/conversation.route.js";
import orderRoute from "./Routes/order.route.js";
import authRoute from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();


dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
).then(() => {
    console.log("aw mcha")
}).catch((err) => {
    console.log(err
    )
})
app.listen(3000, () => {
    console.log("Backend server is running!")
})
app.use(cors({ origin:"http://localhost:5173",credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoute);
app.use("/api/messages", messageRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/orders", orderRoute);
app.use("/api/auth", authRoute);
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "oops smth went wrong";
    return res.status(errorStatus).send(errorMessage);
})

