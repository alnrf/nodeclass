const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/todos", async (req, res, next) => {
  try {
    const sqlQuery = "SELECT * from usuarios";
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const sqlQuery = "INSERT INTO usuarios (nome, senha) values (?,?)";
    const rows = await pool.query(sqlQuery, [req.body.nome, req.body.senha]);
    res.status(201).send({ mensagem: "Usuário criado com sucesso", log: rows });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const sqlQuery = "SELECT * from usuarios where id=?";
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
