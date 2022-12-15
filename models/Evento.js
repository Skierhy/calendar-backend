// solamente usaremos Schema y model de mongoose
const { Schema, model } = require('mongoose');

// creamos el esquema de evento
// type es el tipo de dato que va a tener
// require es para que sea obligatorio
// unique es para que sea único

// el Schema.Types.ObjectId, es para hacer referencia a otro modelo
// en este caso, a Usuario
// ref es para indicar que modelo es el que se va a referenciar
const EventoSchema = Schema({
	title: {
		type: String,
		required: true,
	},
	notes: {
		type: String,
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true,
	},
});

/* Un método que se utiliza para eliminar __v e _id de la respuesta. */
EventoSchema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

// exportar y crear el modelo
// model('nombre del modelo', esquema)
module.exports = model('Evento', EventoSchema);
