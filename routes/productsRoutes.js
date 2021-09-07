const { Router } = require("express");
const express = require("express")
let router = express.Router();
const productsController = require("../controllers/productsController")

router.get("/carrito", productsController.carrito)

router.get("/detalle", productsController.detalle)

router.get("/create", productsController.create)

router.get("/products", )


/*
1. /products (GET)
Listado de productos
2. /products/create (GET)
Formulario de creación de productos
3. /products/:id (GET)
Detalle de un producto particular
4. /products (POST)
Acción de creación (a donde se envía el formulario)
5. /products/:id/edit (GET)
Formulario de edición de productos
6. /products/:id (PUT)
Acción de edición (a donde se envía el formulario):
7. /products/:id (DELETE)
Acción de borrado
*/

module.exports = router 