const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('email')
        .notEmpty().withMessage('Tenés que escribir un correo electrónico').bail()
        .isEmail().withMessage('Por favor escribí un formato de correo válido'),
	body('password').notEmpty().withMessage('Tenés que escribir un password de 8 caracteres'),

	
]