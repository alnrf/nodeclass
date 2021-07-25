const mariadb = require("mariadb");

const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 100,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Conexão perdida");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Muitas conexões");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Conexão recusada");
    }
  }
  if (connection) connection.release();
  return;
});

module.exports = pool;
