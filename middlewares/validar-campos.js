// tener el auto completado de express
const { response } = require('express');
// usar express-validator
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
	// manejo de errores
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// errors.mapped() devuelve un objeto con los errores
		return res.status(400).json({
			ok: false,
			errors: errors.mapped(),
		});
	}
	// el next() es para que continue con el siguiente middleware o el controller
	next();
};

module.exports = {
	validarCampos,
};
