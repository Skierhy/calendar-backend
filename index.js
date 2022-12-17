// require es igual a import en JS pero se usa en node
// Importar express
const express = require('express');
// Importar dotenv para variables de entorno
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express nombre app es un estándar
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio Público
// para mostrar index.html
// use es un middleware
// un middleware es una función que se ejecuta cuando algo pasa en la aplicación (peticiones, respuestas, etc)
// express.static sirve para servir contenido estático
// (la carpeta public)
app.use(express.static('public'));

// Lectura y parseo del body
// para que el servidor entienda los datos que se envían en el body
app.use(express.json());

// Rutas
// ruta que se va a ejecutar cuando se haga una petición a la ruta '/'
// .use('ruta', require('archivo'))
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

/* Sirviendo el archivo index.html. */
// lo que que cualquier ruta en el servidor que no sea /api/...
// ninguna especifica de arriba de código
// haremos un get lo que haces es regresar el index.html
// __dirname es el path inicial de servidor
app.get('*', (req, res) => {
	res.sendFile(__dirname + 'public/index.html');
});

// Escuchar peticiones
// process.env.PORT es una variable de entorno en .env
// callback es una función que se ejecuta cuando el servidor está corriendo
app.listen(process.env.PORT, () => {
	console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
