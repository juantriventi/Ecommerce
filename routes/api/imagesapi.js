const express = require("express");
const imagesApiController = require ("./../../controllers/api/imagesApiController")

const imagesRouter = express.Router() 
imagesRouter.get ("/:name", imagesApiController.getByName)

module.exports = imagesRouter