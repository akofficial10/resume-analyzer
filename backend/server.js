require("dotenv").config(); // Load environment variables early
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");
const fs = require("fs");

const uploadDir = "uploads/";
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// CORS Configuration

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors());

// Middleware
app.use(express.json({ limit: "10mb" })); // Allow large payloads
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/resumes", resumeRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
