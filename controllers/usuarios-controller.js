const pool = require("../database");

exports.getUsuarios = async (req, res, next) => {
  try {
    const sqlQuery = "SELECT * from usuarios";
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
