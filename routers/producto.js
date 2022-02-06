const { Router } = require ('express');
const { check } = require('express-validator');

const {
    consultarProductos, 
    guardarProducto, 
    obtenerProducto,
    actualizarProducto,
    eliminarProducto 
} = require('../controllers/producto');

const { existeCategoriaID, existeProductoID, esRolValido } = require('../helpers/db-validator');
const { validarCampos, validarJwt } = require ('../middleware');

const router = Router ();

router.get ('/:id', [
    check ('id', 'No es un ID valido').isMongoId (),
    check ('id').custom (existeProductoID),
    validarCampos
], obtenerProducto);

router.get ('/', consultarProductos);

router.post ('/', [
    validarJwt,
    check ('nombre', 'El nombre es obligatorio').not ().isEmpty (),
    check ('categoria', 'No es un ID valido').isMongoId (),
    check ('categoria').custom (existeCategoriaID),
    validarCampos
], guardarProducto);

router.put ('/:id', [
    validarJwt,
    check ('id', 'No es un ID valido').isMongoId (),
    check ('id').custom (existeProductoID),
    validarCampos
], actualizarProducto);

router.delete ('/:id', [
    validarJwt,
    // esRolValido,
    check ('id', 'No es un ID valido').isMongoId (),
    validarCampos,
    check ('id').custom (existeProductoID),
    validarCampos
], eliminarProducto);

module.exports = router;