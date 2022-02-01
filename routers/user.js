const { Router } = require ('express');
const { check } = require('express-validator');

const { usuarioGet, usuarioPost, usuarioPut, usuarioDel } = require ('../controllers/user.js');
const { validarCampos } = require('../middleware/validar-campos.js');
const { esRolValido } = require ('../helpers/db-validator');

const router = Router ();

router.get('/', usuarioGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not ().isEmpty (),
    check('password', 'Es obligatorio y mayor a 6 caracteres').isLength ({min: 6}),
    check('correo', 'Correo no es valido').isEmail (),
    check ('rol').custom (esRolValido),
    validarCampos
], usuarioPost);

router.put('/:id', usuarioPut);

router.delete('/', usuarioDel);

module.exports = router;