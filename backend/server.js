import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import resumeRoutes from "./routes/resumeRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(express.json());

// Connect DB
connectDB();

app.use("/api/auth", userRoutes);
app.use("/api/resume", resumeRoutes);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, _path) => {
      res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    },
  })
);

app.get("/", (req, res) => {
  res.send("API working");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});
