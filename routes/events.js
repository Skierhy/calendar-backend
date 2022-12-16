/*
    Rutas de eventos / events
    host + /api/events
*/
// router sirve para crear rutas
const { Router } = require('express');
// express validator
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
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
router.post(
	'/',
	[
		check('title', 'El título es obligatorio').not().isEmpty(),
		check('start', 'Fecha de inicio es obligatoria').custom(isDate),
		check('end', 'Fecha de finalización es obligatoria').custom(isDate),
		validarCampos,
	],
	crearEvento
);

// actualiza el evento
router.put(
	'/:id',
	[
		check('title', 'El título es obligatorio').not().isEmpty(),
		check('start', 'Fecha de inicio es obligatoria').custom(isDate),
		check('end', 'Fecha de finalización es obligatoria').custom(isDate),
		validarCampos,
	],
	actualizarEvento
);

// eliminar el evento
router.delete('/:id', eliminarEvento);

// exportar el router
module.exports = router;
