import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

import adminRouter from "./routes/admin.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import classRouter from "./routes/class.routes.js";
import sectionRouter from "./routes/section.routes.js"
import studentRouter from "./routes/student.routes.js"

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/classes", classRouter);
app.use("/api/v1/sections", sectionRouter);
app.use("/api/v1/students", studentRouter);
export { app };
