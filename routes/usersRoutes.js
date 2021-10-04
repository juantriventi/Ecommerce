const { Router } = require("express");
const express = require("express")
let router = express.Router();
let = logDBMiddleware = require("../middlewares/logDBMiddleware")
const usersController = require("../controllers/usersController.js")


const { body } = require("express-validator");

const validations = [
    body("nombre").notEmpty().withMessage("Coloca tu nombre"),
    body("apellido").notEmpty().withMessage("Coloca tu apellido"),
    body("email").notEmpty().withMessage("Tenes que poner un mail"),
    body("password").notEmpty().withMessage("Pon una contraseña"),
    body("confirmPassword").notEmpty().withMessage("Repite la contraseña anterior")
]

router.get("/login", usersController.login);

router.get("/register", usersController.register);

router.post("/register", validations, logDBMiddleware, usersController.processRegister);


module.exports = router;