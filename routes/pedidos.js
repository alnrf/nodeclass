const express = require("express");
const router = express.Router();
const pool = require("../database");

router.get("/", async (req, res, next) => {
  try {
    const sqlQuery = `select
	p.id_pedido,
	p.produto ,
	p.qtde ,
	c.nome ,
	c.email ,
	c.telefone
from
	node.pedidos p
inner join node.clientes c
where
	p.id_pedido = c.id_pedido`;
    const rows = await pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
