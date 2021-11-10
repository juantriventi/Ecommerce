//const { Router } = require("express");
const express = require("express")
const router = express.Router();
let = logDBMiddleware = require("../middlewares/logDBMiddleware")
const usersController = require("../controllers/usersController.js")
const authMiddleware = require("../middlewares/authMiddleware")
const validations = require("../middlewares/validateRegisterMiddleware")
const validationLogin = require("../middlewares/validateLogin.js")
const guestMiddleware = require("../middlewares/guestMiddleware")

const { body } = require("express-validator");
//const PoolCluster = require("mysql2/typings/mysql/lib/PoolCluster");





router.get("/", usersController.list);

router.get("/login", guestMiddleware, usersController.login);

router.post("/login", validationLogin, usersController.loginProcess);

router.get("/profile", authMiddleware, usersController.profile);

router.get("/logout", usersController.logout);

router.get("/detail/:id", authMiddleware, usersController.detail);

//CRUD//
router.get("/register", guestMiddleware, usersController.register);

router.post("/create", validations, logDBMiddleware, usersController.processRegister);

router.get("/edit/:id", authMiddleware, usersController.edit);

router.put("/update/:id", usersController.update);

router.delete("/delete/:id", usersController.destroy);


module.exports = router;