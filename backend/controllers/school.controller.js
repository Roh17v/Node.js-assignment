import { db } from "../index.js";

export const getSchools = (req, res) => {
  const sql = "SELECT * FROM schools";
  db.query(sql, (err, results) => {
    console.log(results);
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
