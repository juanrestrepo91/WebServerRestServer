const { Router } = require ('express');
const { check } = require('express-validator');

const { validarCampos, validarJwt, validarRole, tieneRol } = require ('../middleware');
const { esRolValido, emailExiste, existeID } = require ('../helpers/db-validator');
const { usuarioGet, usuarioPost, usuarioPut, usuarioDel } = require ('../controllers/user');

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
    validarJwt,
    validarRole,
    tieneRol ('ADMIN_ROLE', 'USER_ROLE'),
    check ('id', 'No es un ID valido').isMongoId (),
    check ('id').custom (existeID),
    validarCampos
], usuarioDel);

module.exports = router;