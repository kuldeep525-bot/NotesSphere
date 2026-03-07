import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectdb from "./src/config/db.js";
import authRoutes from "./src/routes/user.routes.js";
import notesRoutes from "./src/routes/notes.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import paperRoutes from "./src/routes/paper.routes.js";
import cookieParser from "cookie-parser";
import passport from "passport";
import fs from "fs";
import path from "path";

const app = express();
const port = process.env.PORT || 6000;

/* ================================
   TEMP FOLDER CREATE (FOR MULTER)
================================ */

const tempDir = path.resolve("public/temp");

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log("Temp folder created:", tempDir);
}

/* ================================
   DATABASE
================================ */

await connectdb();

/* ================================
   CORS
================================ */

app.use(
  cors({
    origin: "https://notesspherestu.onrender.com",
    credentials: true,
  }),
);

/* ================================
   MIDDLEWARE
================================ */

app.use(passport.initialize());
app.use(express.json());
app.use(cookieParser());

/* ================================
   ROUTES
================================ */

app.use("/api/auth", authRoutes);
app.use("/api/paper", paperRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/v2/admin", adminRoutes);

/* ================================
   SERVER START
================================ */

app.listen(port, () => {
  console.log("Server running on port", port);
});
