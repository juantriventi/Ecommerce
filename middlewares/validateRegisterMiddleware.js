const path = require('path');
const { body } = require('express-validator');

module.exports = [
	
		body("nombre").notEmpty().withMessage("Coloca tu nombre"),
		body("apellido").notEmpty().withMessage("Coloca tu apellido"),
		body("email")
			.notEmpty().withMessage("Tenes que poner un mail").bail()
			.isEmail().withMessage("Tienes que poner un formato de correo electronico valido"),
		body("password").notEmpty().withMessage("Pon una contraseña"),
		body("confirmPassword").notEmpty().withMessage("Repite la contraseña anterior")

]