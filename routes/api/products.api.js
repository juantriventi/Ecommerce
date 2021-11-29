const { Router } = require("express");
const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const productsApi = require("../../controllers/api/products.controller.api")
const {validacionProductoMiddleware, reglasValidacion} = require ("../../middlewares/validacionProductoMiddleware");

router.get("/", productsApi.list);
router.get("/latest", productsApi.latest)
router.get("/:id",productsApi.detail);
router.get("/name/:name",productsApi.getByName);



module.exports = router;