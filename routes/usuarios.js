const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: " Rota do GET criada",
  });
});

router.post("/", (req, res, next) => {
  res.status(201).send({
    mensagem: " Rota do POST criada",
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).send({
    mensagem: " Rota do GET criada para busca por id ",
    id: id,
  });
});

router.patch("/", (req, res, next) => {
  const id = req.params.id;
  res.status(200).send({
    mensagem: " Rota do PATCH criada para atualizar ",
  });
});

router.put("/", (req, res, next) => {
  res.status(200).send({
    mensagem: " Rota do PUT criada para atualizar ",
  });
});

router.delete("/", (req, res, next) => {
  res.status(200).send({
    mensagem: " Rota do DELETE criada para busca",
  });
});

module.exports = router;
