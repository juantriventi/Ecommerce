const { Router } = require("express");
const express = require("express");
const multer = require("multer");
const path = require("path");

const { body } = require("express-validator");

/*** devielve los errores de los formularios ***/

const validateProduct = [
  body("nombre").notEmpty().withMessage("Debe Completar Este campo"),
  //body('price').isInt({min: 1}).withMessage('El campo precio tiene que ser un numero mayor a 1'),
  //body('discount').isInt({min: 0, max:100}).withMessage('Descuento fuera de rango'),
  //body('category').notEmpty().withMessage('Debe Completar Este campo'),
  //body('description').notEmpty().withMessage('Debe Completar Este campo').bail().isLength({min:0,max:200}).withMessage('Tiene que escribir menos de 200 carateres'),
];

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

let router = express.Router();

const productosController = require("../controllers/productosController");

router.get("/", productosController.index);

router.post("/buscar", productosController.search);

router.get("/carrito", productosController.carrito);

router.get("/detalle/:id", productosController.detalle);

router.get("/create", productosController.create); // miestra la vista para crear

router.post("/create", uploadFile.single("imagen"), productosController.store); // procesa y almacena el producto

router.get('/create/:id', productosController.update);

router.put('/create/:id', uploadFile.single("imagen"), productosController.put);

router.delete("/delete/:id", productosController.remove);

module.exports = router;