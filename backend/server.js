const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// Load .env
dotenv.config();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Root Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Auth Routes
const authRoute = require("./routes/auth");
app.use("/auth", authRoute);

// Python ML Routes
const analyzeRoute = require("./routes/analyze");
app.use("/api/analyze", analyzeRoute);

// Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://127.0.0.1:${PORT}`));
