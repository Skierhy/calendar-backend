/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
// router sirve para crear rutas
const { Router } = require('express');
// check sirve para validar los campos
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {
	crearUsuario,
	loginUsuario,
	revalidarToken,
} = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

// crear el router
const router = Router();

// post es para crear
// get es para obtener
// put es para actualizar
// delete es para eliminar

// sintaxis router.<metodo>('<ruta>', <middlewares>, <funcion>)

// crear usuario
router.post(
	'/new',
	[
		// middlewares
		// sintaxis check('<campo>', '<mensaje de error>').<metodo de validacion>
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({
			min: 6,
		}),
		validarCampos,
	],
	crearUsuario
);

// login
router.post(
	'/',
	[
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({
			min: 6,
		}),
		validarCampos,
	],
	loginUsuario
);

// revalidar token
// autenticado los usuarios de forma pasiva el servidor le envía un token
router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
