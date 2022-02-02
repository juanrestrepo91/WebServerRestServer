const { Router } = require ('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middleware/validar-campos.js');
const { login } = require('../controllers/auth');

const router = Router ();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail (),
    check('password', 'La contraseña no puede ser vacia').not ().isEmpty (),
    validarCampos
], login);

module.exports = router;