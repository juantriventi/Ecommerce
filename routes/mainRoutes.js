const { Router } = require("express");
const express = require("express")
let router = express.Router();
const mainController = require("../controllers/mainController.js")

router.get("/", mainController.index)

module.exports = router 