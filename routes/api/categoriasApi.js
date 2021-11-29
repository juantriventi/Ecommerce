const express = require('express');
const router = express.Router();
const categoriesApiController = require('../../controllers/api/categoriesAPIController');

//Rutas
//Listado de Categorias
router.get('/', categoriesApiController.list);
//Cantidad de Categorias
router.get('/count', categoriesApiController.count);


module.exports = router;