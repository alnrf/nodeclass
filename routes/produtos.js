const express = require("express");
const router = express.Router();
const pool = require("../database");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-").split(".")[0] +
        "_" +
        file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true); // se o arquivo for jpg ou png entra aqui
  } else {
    cb(null, false); // se o arquivo não for jpg ou png entra aqui. É possível tratar o erro.
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 3, // 3Mb
  },
});

router.post("/", upload.single("imagem"), async (req, res, next) => {
  console.log(req.file);

  try {
    const sqlQuery =
      "INSERT INTO produtos (descricao, preco, imagem) values (?,?,?)";
    const rows = await pool.query(sqlQuery, [
      req.body.descricao,
      req.body.preco,
      req.file.path,
    ]);
    res.status(201).send({
      mensagem: `O produto ${req.body.descricao} foi inserido`,
      produto: {
        descricao: req.body.descricao,
        preco: req.body.preco,
        imagem: req.file.path,
        id_produto: rows.insertId,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.patch(
  "/updateProduto/:id_produto",
  upload.single("imagem"),
  async (req, res, next) => {
    console.log(req.file);
    try {
      const sqlQuery =
        "UPDATE produtos set descricao = ?, preco = ?, imagem = ? where id_produto = ?";
      const rows = await pool.query(sqlQuery, [
        req.body.descricao,
        req.body.preco,
        req.file.path,
        req.params.id_produto,
      ]);
      res.status(200).send({
        mensagem: `O produto ${req.body.descricao} foi atualizado`,
        produto: {
          descricao: req.body.descricao,
          preco: req.body.preco,
          imagem: req.file.path,
          id_produto: req.params.id_produto,
        },
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
);

module.exports = router;
