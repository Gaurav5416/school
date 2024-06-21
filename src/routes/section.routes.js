import { Router } from "express";
import { createSection, getSection, updateSection, deleteSection } from "../controllers/section.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-section").post(verifyJWT, createSection);

router.route("/get-section/:sectionId").post(verifyJWT, getSection);

router.route("/update-section/:sectionId").patch(verifyJWT, updateSection);

router.route("/delete-section/:sectionId").delete(verifyJWT, deleteSection);

export default router;
