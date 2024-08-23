import express from "express";
import {
  addSchool,
  getSchools,
  listSchoolsByProximity,
} from "../controllers/school.controller.js";

const router = express.Router();

router.get("/api/schools", getSchools);

router.post("/addSchool", addSchool);

router.get("/listSchools", listSchoolsByProximity);

export default router;
