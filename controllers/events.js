const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
	// populate es para hacer la referencia al modelo Usuario y traer el nombre del usuario
	const eventos = await Evento.find().populate('user', 'name');
	return res.status(200).json({
		ok: true,
		eventos,
	});
};

const crearEvento = async (req, res = response) => {
	const evento = new Evento(req.body);

	try {
		// Guardar el usuario que crea el evento este es importante para que el modelo lo valide
		evento.user = req.uid;

		const eventoGuardado = await evento.save();

		return res.json({
			ok: true,
			evento: eventoGuardado,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const actualizarEvento = async (req, res = response) => {
	// req significa request y res significa response
	// request sirve para obtener información del cliente
	// response sirve para mandar información al cliente
	// extraer el id del evento
	const eventoId = req.params.id;
	// extraer el id del usuario
	const uid = req.uid;
	// try catch para manejar los errores de la petición
	try {
		// buscar el evento por el id para ver si existe uno con ese id
		const evento = await Evento.findById(eventoId);
		// si no existe se manda un error de que no existe el evento
		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: 'Evento no encontrado',
			});
		}
		// si el usuario que quiere editar el evento no es el mismo que lo creo, se manda un error
		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No tiene privilegio de editar este evento',
			});
		}
		// si todo sale bien se crea un nuevo evento con los datos del body y el id del usuario
		const nuevoEvento = {
			...req.body,
			user: uid,
		};
		// se actualiza el evento con el id del evento y el nuevo evento
		// el new: true es para que devuelva el evento actualizado
		const eventoActualizado = await Evento.findByIdAndUpdate(
			eventoId,
			nuevoEvento,
			{ new: true }
		);
		// se manda el evento actualizado
		return res.json({
			ok: true,
			evento: eventoActualizado,
		});
		// si hay un error se manda un mensaje de error
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const eliminarEvento = async (req, res = response) => {
	// req significa request y res significa response
	// request sirve para obtener información del cliente
	// response sirve para mandar información al cliente
	// extraer el id del evento
	const eventoId = req.params.id;
	// extraer el id del usuario
	const uid = req.uid;
	// try catch para manejar los errores de la petición
	try {
		// buscar el evento por el id para ver si existe uno con ese id
		const evento = await Evento.findById(eventoId);
		// si no existe se manda un error de que no existe el evento
		if (!evento) {
			return res.status(404).json({
				ok: false,
				msg: 'Evento no encontrado',
			});
		}
		// si el usuario que quiere editar el evento no es el mismo que lo creo, se manda un error
		if (evento.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No tiene privilegio de eliminar este evento',
			});
		}

		// si todo sale bien se elimina el evento
		await Evento.findByIdAndDelete(eventoId);

		// se manda el mensaje de eliminar este event
		return res.json({
			ok: true,
			msg: 'Evento eliminado',
		});
		// si hay un error se manda un mensaje de error
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

module.exports = {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
};
