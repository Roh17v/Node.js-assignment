import express from "express";
import { getSchools } from "../controllers/school.controller.js";

const router = express.Router();

router.get("/", getSchools);

export default router;
