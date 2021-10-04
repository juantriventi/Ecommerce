const { validationResult } = require('express-validator');

const controlador = {
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