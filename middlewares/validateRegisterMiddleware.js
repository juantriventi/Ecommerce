const path = require('path');
const { body } = require('express-validator');

module.exports = [
	
	    body("userName").notEmpty().withMessage("Coloca tu usuario"),
		body("firstName").notEmpty().withMessage("Coloca tu nombre"),
		body("lastName").notEmpty().withMessage("Coloca tu apellido"),
		body("email")
			.notEmpty().withMessage("Tenes que poner un mail").bail()
			.isEmail().withMessage("Tienes que poner un formato de correo electronico valido"),
		body("street").notEmpty().withMessage("Coloca tu calle"),
		body("number").notEmpty().withMessage("Coloca el npumero de tu calle"),
		body("city").notEmpty().withMessage("Coloca tu ciudad"),
		body("state").notEmpty().withMessage("Coloca tu provincia"),
		body("cp").notEmpty().withMessage("Coloca tu código postal"),
		body("phone_number").notEmpty().withMessage("Coloca tu número de teléfono"),
		body("password").notEmpty().withMessage("Pon una contraseña"),
		body("confirmPassword").notEmpty().withMessage("Repite la contraseña anterior")

]