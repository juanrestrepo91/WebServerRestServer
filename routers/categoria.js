const { Router } = require ('express');
const { check } = require('express-validator');

const { guardarCategoria, obtenerCategoria, obtenerCategorias, actualizarCategoria, eliminarCategoria } = require('../controllers/categoria');
const { existeCategoriaID, esRolValido } = require('../helpers/db-validator');
const { validarCampos, validarJwt } = require ('../middleware');

const router = Router ();

router.get ('/', obtenerCategorias);

router.get ('/:id', [
    check ('id', 'No es un ID valido').isMongoId (),
    check ('id').custom (existeCategoriaID),
    validarCampos
], obtenerCategoria);

router.post ('/', [
    validarJwt,
    check ('nombre', 'El nombre es obligatorio').not ().isEmpty (),
    validarCampos
], guardarCategoria);

router.put ('/:id', [
    validarJwt,
    check ('id', 'No es un ID valido').isMongoId (),
    check ('nombre', 'El nombre es obligatorio').not ().isEmpty (),
    check ('id').custom (existeCategoriaID),
    validarCampos
], actualizarCategoria);

router.delete ('/:id', [
    validarJwt,
    esRolValido,
    check ('id', 'No es un ID valido').isMongoId (),
    validarCampos,
    check ('id').custom (existeCategoriaID),
    validarCampos
], eliminarCategoria);

module.exports = router;