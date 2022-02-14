const { Router } = require ('express');
const { check } = require('express-validator');

const { validarCampos, validarJwt } = require('../middleware');
const { login, loginGoogle, renovarToken } = require('../controllers/auth');

const router = Router ();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail (),
    check('password', 'La contraseña no puede ser vacia').not ().isEmpty (),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El token es obligatorio').not ().isEmpty (),
    validarCampos
], loginGoogle);

router.get('/', [ validarJwt ], renovarToken);

module.exports = router;