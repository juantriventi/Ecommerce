//const { Router } = require("express");
const express = require("express")
const router = express.Router();
let = logDBMiddleware = require("../middlewares/logDBMiddleware")
const usersController = require("../controllers/usersController.js")
const authMiddleware = require("../middlewares/authMiddleware")
const validations = require("../middlewares/validateRegisterMiddleware")
const validationLogin = require("../middlewares/validateLogin")
const guestMiddleware = require("../middlewares/guestMiddleware")

const { body } = require("express-validator");
const PoolCluster = require("mysql2/typings/mysql/lib/PoolCluster");



const validations = [
    body("nombre").notEmpty().withMessage("Coloca tu nombre"),
    body("apellido").notEmpty().withMessage("Coloca tu apellido"),
    body("email")
        .notEmpty().withMessage("Tenes que poner un mail").bail()
        .isEmail().withMessage("Tienes que poner un formato de correo electronico valido"),
    body("password").notEmpty().withMessage("Pon una contraseña"),
    body("confirmPassword").notEmpty().withMessage("Repite la contraseña anterior")
]

router.get("/", usersController.list);

router.get("/login", guestMiddleware, usersController.login);

router.post("/login", validationLogin, usersController.loginProcess);

router.get("/profile", authMiddleware, usersController.profile);

router.get("/logout", usersController.logout);

router.get("/detail/:id", authMiddleware, usersController.detail);

//CRUD//
router.get("/register", guestMiddleware, usersController.register);

router.post("/register", validations, logDBMiddleware, usersController.processRegister);

router.get("/edit/:id", authMiddleware, usersController.edit);

router.put("/update/:id", usersController.update);

router.delete("/delete/:id", usersController.destroy);


module.exports = router;