import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors());
app.use(express.json());

/* 🔥 DISABLE CACHE (IMPORTANT FIX) */
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

/* ---------------- DATABASE ---------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

/* ---------------- ROUTES ---------------- */
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

/* ---------------- DEFAULT ---------------- */
app.get("/", (req, res) => {
  res.send("AeroFeed Backend Running 🚀");
});

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} 🚀`)
);