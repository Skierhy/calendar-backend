// express para el auto completado ya en el index lo tenemos importado
const { response } = require('express');
// jwt para verificar el token
const jwt = require('jsonwebtoken');

// Validar el token
const validarJWT = (req, res = response, next) => {
	// x-token headers personalizados
	const token = req.header('x-token');

	// Si no hay token, por ejemplo si no esta autenticado
	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'No hay token en la petición',
		});
	}
	// Si hay token, lo verificamos
	try {
		// Verificamos el token
		// verify(token, seed)
		const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
		// Si el token es válido, agregamos el uid y el name al request
		// para que estén disponibles en las rutas
		// request sirve para guardar información que se puede usar en cualquier parte de la aplicación
		req.uid = uid;
		req.name = name;
	} catch (error) {
		// Si el token no es válido
		return res.status(401).json({
			ok: false,
			msg: 'Token no válido',
		});
	}
	// Si todo sale bien, continuamos
	next();
};

// Exportamos el middleware
module.exports = {
	validarJWT,
};
