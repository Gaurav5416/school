import { Router } from "express";
import { createClass, getClass, updateClass, deleteClass } from "../controllers/class.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-class").post(verifyJWT, createClass);

router.route("/get-class/:classId").post(verifyJWT, getClass);

router.route("/update-class/:classId").patch(verifyJWT, updateClass);

router.route("/delete-class/:classId").delete(verifyJWT, deleteClass);

export default router;
