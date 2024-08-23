import express from "express";
import { addSchool, getSchools } from "../controllers/school.controller.js";

const router = express.Router();

router.get("/schools", getSchools);

router.post("/addSchool", addSchool);

export default router;
