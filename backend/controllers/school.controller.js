import { db } from "../index.js";

export const getSchools = (req, res, next) => {
  const sql = "SELECT * FROM schools";
  db.query(sql, (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results);
  });
};
