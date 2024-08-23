import Joi from "joi";
import { db } from "../index.js";
import { calculateDistance } from "../utils/calculateDistance.js";
import { createError } from "../utils/createError.js";

export const getSchools = (req, res, next) => {
  const sql = "SELECT * FROM schools";
  db.query(sql, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};

export const addSchool = (req, res, next) => {
  const { error } = validateSchool(req.body);
  if (error) return next(createError(400, error.details[0].message));

  const sql =
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [req.body.name, req.body.address, req.body.latitude, req.body.longitude],
    (err, result) => {
      if (err) return next(err);
      return res.json(result);
    }
  );
};

export const listSchoolsByProximity = (req, res, next) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return next(createError(400, "Latitude and Longitude needed."));
  }

  const query = "SELECT id, name, latitude, longitude FROM schools";
  db.query(query, (err, schools) => {
    if (err) return next(err);

    schools = schools.map((school) => {
      const distance = calculateDistance(
        latitude,
        longitude,
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    });

    schools.sort((a, b) => a.distance - b.distance);

    res.json(schools);
  });
};

function validateSchool(school) {
  const schoolSchema = Joi.object({
    name: Joi.string().min(10).trim().required().messages({
      "string.empty": "Name is required",
    }),
    address: Joi.string().trim().required().messages({
      "string.empty": "Address is required",
    }),
    latitude: Joi.number().min(-90).max(90).required().messages({
      "number.base": "Latitude must be a number",
      "number.min": "Latitude must be between -90 and 90",
      "number.max": "Latitude must be between -90 and 90",
    }),
    longitude: Joi.number().min(-180).max(180).required().messages({
      "number.base": "Longitude must be a number",
      "number.min": "Longitude must be between -180 and 180",
      "number.max": "Longitude must be between -180 and 180",
    }),
  });

  return schoolSchema.validate(school);
}
