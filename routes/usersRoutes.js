const { Router } = require("express");
const express = require("express")
let router = express.Router();
let = logDBMiddleware = require("../middlewares/logDBMiddleware");
const {
    reglasValidacionUser, 
    validacionUserMiddleware, 
    validacionAuthUser,
    userIsLoged
} = require('../middlewares/validacionUserMiddleware');
const usersController = require("../controllers/usersController.js")



router.get("/login", usersController.login);

router.get("/register", usersController.register);

router.post("/register", reglasValidacionUser(), validacionUserMiddleware, logDBMiddleware, usersController.store);

router.post("/auth",validacionAuthUser, usersController.auth);

router.get("/detail/:id",userIsLoged, usersController.detail);

router.post("/logout",userIsLoged, usersController.logout);

router.delete("/delete/:id",userIsLoged, usersController.delete);

router.get("/edit/:id", usersController.edit);

router.put("/:id", usersController.put );

module.exports = router;