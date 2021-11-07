
const path = require("path");
let db = require("../src/database/models")
const sequelize = db.sequelize
const {Op} = require("sequelize")
const bcryptjs = require("bcryptjs")
const { validationResult } = require('express-validator');
const { userInfo } = require("os");
const User = db.User


const controlador = {

    list: (req,res) => {
        User.findAll()
        .then(users=>{
            res.render("users/users", {users})
        })
    },
    login: (req,res) => {
        return res.render("users/login");
    },
    processRegister: (req,res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resultValidation.mapped(),
                oldData: req.body,
            });
        }
     },
    register: (req,res) => {
        return res.render("users/register");
    },
}
    module.exports = controlador