import { Router } from "express";
import {
  createStudent,
  getStudent,
  deleteStudent,
  updateStudent,
  getStudentsList,
} from "../controllers/student.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-student").post(verifyJWT, createStudent);

router.route("/get-student/:studentId").post(verifyJWT, getStudent);

router.route("/update-student/:studentId").patch(verifyJWT, updateStudent);

router.route("/delete-student/:studentId").delete(verifyJWT, deleteStudent);

router.route("/get-students-list").post(verifyJWT, getStudentsList);
export default router;
