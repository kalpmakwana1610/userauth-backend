const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config({ path: "./user.env" });

const app = express();
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use("/api/auth", authRoutes);
console.log("JWT_SECRET:", process.env.JWT_SECRET);

module.exports = app;


// {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDY0ODhlOWQyYzJjZmIxN2M1YzkxZiIsImlhdCI6MTc0NTI0MjI1NCwiZXhwIjoxNzQ3ODM0MjU0fQ.VJRwBBWwBIIkfKCloBtG3UDiUHlm7e0L0ephOPZ8wcQ"}

// {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDY0Y2E1ODU4MTA2NzgxYWMyZTc5OSIsImlhdCI6MTc0NTI0MzMwMSwiZXhwIjoxNzQ3ODM1MzAxfQ.1BFvPrcu6tVMOWYrictGlaKoOUozshsgAGpFGPmV33Q"}