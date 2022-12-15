// solamente usaremos Schema y model de mongoose
const { Schema, model } = require('mongoose');

// creamos el esquema de usuario
// type es el tipo de dato que va a tener
// require es para que sea obligatorio
// unique es para que sea único
const UsuarioSchema = Schema({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
});

// exportar y crear el modelo
// model('nombre del modelo', esquema)
module.exports = model('Usuario', UsuarioSchema);
