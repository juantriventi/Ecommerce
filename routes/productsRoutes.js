const { Router } = require("express");
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const {validacionProductoMiddleware, reglasValidacion} = require ("./../middlewares/validacionProductoMiddleware");

/***  multer se encarga de almacenar archivos en el servidor express ***/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./public/images/products");
  },
  filename: (req, file, callback) => {
    const fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
    callback(null, fileName);
  },
});

const uploadFile = multer({
  storage: storage,
 
});



const productosController = require("../controllers/productosController");
const { appendFile } = require("fs");

router.get("/", productosController.list);

router.post("/buscar", productosController.search);

router.get("/carrito", productosController.carrito);

router.get("/marcas", productosController.marcas);

router.get("/detalle/:id", productosController.detalle);

router.get("/create", productosController.create); // miestra la vista para crear

router.post("/create", uploadFile.single("imagen"), reglasValidacion(),validacionProductoMiddleware, productosController.store); 

router.get('/update/:id', productosController.update);

router.put('/update/:id', uploadFile.single("imagen"),reglasValidacion(),validacionProductoMiddleware, productosController.put);

router.delete("/delete/:id", productosController.remove);




module.exports = router;