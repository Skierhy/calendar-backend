// importamos la librería
const jwt = require('jsonwebtoken');

// uid del usuario y usuario
const generarJWT = (uid, name) => {
	// retornamos una promesa
	return new Promise((resolve, reject) => {
		// creamos el payload
		const payload = { uid, name };
		// generamos el token
		// sign sirve para firmar un token
		// sing ( payload, secret, options, callback)
		// options sera la expiración en 2 horas
		// callback el cual contiene el error y el token
		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{
				expiresIn: '2h',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('No se pudo generar el token');
				}
				// si no hay error, resolvemos el token
				resolve(token);
			}
		);
	});
};

// exportamos la función
module.exports = {
	generarJWT,
};
