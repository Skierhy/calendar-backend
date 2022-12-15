/*
    Rutas de eventos / events
    host + /api/events
*/
// router sirve para crear rutas
const { Router } = require('express');
const {
	getEventos,
	crearEvento,
	actualizarEvento,
	eliminarEvento,
} = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');

// crear el router
const router = Router();

// validar el token a todos los eventos
router.use(validarJWT);

// obtener el evento
router.get('/', getEventos);

// crear un evento nuevo
router.post('/', crearEvento);

// actualiza el evento
router.put('/:id', actualizarEvento);

// eliminar el evento
router.delete('/:id', eliminarEvento);

// exportar el router
module.exports = router;
