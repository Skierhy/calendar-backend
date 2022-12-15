const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
	return res.status(200).json({
		ok: true,
		msg: 'getEventos',
	});
};

const crearEvento = async (req, res = response) => {
	const evento = new Evento(req.body);

	try {
		// Guardar el usuario que crea el evento este es importante para que el modelo lo valide
		evento.user = req.uid;

		const eventoGuardado = await evento.save();

		res.json({
			ok: true,
			evento: eventoGuardado,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const actualizarEvento = async (req, res = response) => {
	return res.status(201).json({
		ok: true,
		msg: 'actualizarEvento',
	});
};

const eliminarEvento = async (req, res = response) => {
	return res.status(201).json({
		ok: true,
		msg: 'eliminarEvento',
	});
};

module.exports = {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
};
