const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
	// req.body es lo que se envía en el body de la petición
	const { email, password } = req.body;
	// se crea un try catch para manejar los errores por que usamos el await
	try {
		// lo que hace es la petición de la base de datos y busca el email
		// si lo encuentra lo guarda en la variable usuario
		// si no lo encuentra lo deja como undefined / null
		let usuario = await Usuario.findOne({ email });
		// si el usuario existe se manda un error
		if (usuario) {
			// indicar el status de la respuesta
			return res.status(400).json({
				ok: false,
				msg: 'El usuario ya existe',
			});
		}
		// manda el body de la petición
		usuario = new Usuario(req.body);

		// Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);
		// Guardar usuario
		await usuario.save();

		// Generar JWT
		const token = await generarJWT(usuario.id, usuario.name);
		// si todo sale bien se manda la respuesta con el estado 201 que se guardo correctamente
		res.status(201).json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		// mostrar el error en la consola y mandar el error al cliente
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};

const loginUsuario = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const usuario = await Usuario.findOne({ email });

		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario no existe con ese email',
			});
		}

		// Confirmar los passwords
		const validPassword = bcrypt.compareSync(password, usuario.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Password incorrecto',
			});
		}

		// Generar JWT
		const token = await generarJWT(usuario.id, usuario.name);

		res.json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};

const revalidarToken = async (req, res = response) => {
	const { uid, name } = req;

	// Generar JWT
	const token = await generarJWT(uid, name);

	res.json({
		ok: true,
		token,
	});
};

module.exports = {
	crearUsuario,
	loginUsuario,
	revalidarToken,
};
