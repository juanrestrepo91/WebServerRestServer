const { Router } = require ('express');
const { check } = require('express-validator');

const { usuarioGet, usuarioPost, usuarioPut, usuarioDel } = require ('../controllers/user.js');
const { validarCampos } = require('../middleware/validar-campos.js');
const { esRolValido, emailExiste, existeID } = require ('../helpers/db-validator');

const router = Router ();

router.get('/', usuarioGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not ().isEmpty (),
    check('password', 'Es obligatorio y mayor a 6 caracteres').isLength ({min: 6}),
    check('correo', 'Correo no es valido').isEmail (),
    check('correo').custom (emailExiste),
    check ('rol').custom (esRolValido),
    validarCampos
], usuarioPost);

router.put('/:id', [
    check ('id', 'No es un ID valido').isMongoId (),
    check ('id').custom (existeID),
    check ('rol').custom (esRolValido),
    validarCampos
], usuarioPut);

router.delete('/:id', [
    check ('id', 'No es un ID valido').isMongoId (),
    check ('id').custom (existeID),
], usuarioDel);

module.exports = router;