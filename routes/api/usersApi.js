const express = require('express');
const routerApiUser = express.Router();
const usersAPIController = require('../../controllers/api/usersApiController');

//Rutas
//Listado de usuarios
routerApiUser.get('/', usersAPIController.list);
//Cantidad de usuarios
routerApiUser.get('/count', usersAPIController.count);
//Detalle de una usuario
routerApiUser.get('/:id', usersAPIController.detail);

routerApiUser.get("/name/:name", usersAPIController.search);



module.exports = routerApiUser;