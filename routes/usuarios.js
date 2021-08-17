const express = require("express");
const router = express.Router();
const pool = require("../database");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

//import the controllers
const usuariosController = require("../controllers/usuarios-controller");

router.get("/getUsuarios", usuariosController.getUsuarios);

router.post("/cadastro", async (req, res, next) => {
  var hash = bcrypt.hashSync(req.body.senha);
  console.log(hash);
  try {
    const sqlQuery = "INSERT INTO usuarios (email, senha) values (?,?)";
    const results = await pool.query(sqlQuery, [req.body.email, hash]);
    res
      .status(201)
      .send({ mensagem: "Usuário criado com sucesso", log: results });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const sqlQuery = `SELECT * FROM usuarios WHERE email = ?`;
    var results = await pool.query(sqlQuery, [req.body.email]);
    res.status(200).json(results[0].senha);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const sqlQuery = "SELECT * from usuarios where userId=?";
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/", async (req, res, next) => {
  try {
    const sqlQuery = "UPDATE usuarios set nome=?, senha=? where id=?";
    const rows = await pool.query(sqlQuery, [
      req.body.nome,
      req.body.senha,
      req.body.id,
    ]);
    res
      .status(201)
      .send({ mensagem: "Usuário atualizado com sucesso", log: rows });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const sqlQuery = "UPDATE usuarios set nome=?, senha=? where id=?";
    const rows = await pool.query(sqlQuery, [
      req.body.nome,
      req.body.senha,
      req.body.id,
    ]);
    res
      .status(201)
      .send({ mensagem: "Usuário atualizado com sucesso", log: rows });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    const sqlQuery = "DELETE FROM usuarios  where id=?";
    const rows = await pool.query(sqlQuery, req.body.id);
    res
      .status(201)
      .send({ mensagem: "Usuário excluído com sucesso", log: rows });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
