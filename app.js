const express = require("express");
const app = express();
const morgan = require("morgan");

const rotaUsuarios = require("./routes/usuarios");

app.use(morgan("dev"));

app.use("/usuarios", rotaUsuarios);

app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

module.exports = app;
