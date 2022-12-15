const { response } = require('express');

const getEventos = async (req, res = response) => {
	return res.status(200).json({
		ok: true,
		msg: 'getEventos',
	});
};

const crearEvento = async (req, res = response) => {
	console.log(req.body);
	return res.status(201).json({
		ok: true,
		msg: 'crearEvento',
	});
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
