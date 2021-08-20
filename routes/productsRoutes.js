const { Router } = require("express");
const express = require("express")
let router = express.Router();
const productosController = require("../controllers/productosController")

router.get("/carrito", productosController.carrito)

router.get("/detalle", productosController.detalle)

router.get("/create", productosController.create)

module.exports = router 