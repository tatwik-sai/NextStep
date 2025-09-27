import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import clerkRoutes from "./routes/ClerkRoutes.js";
import userRoutes from "./routes/UserRoutes.js";

dotenv.config();


const app = express()
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))
app.use("/clerk", clerkRoutes)
app.use("/users", userRoutes)

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const server = app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`)
});

mongoose.connect(databaseUrl)
  .then(() => console.log("Mongoose connected!"))
  .catch((err) => console.error("Mongoose connection error:", err));