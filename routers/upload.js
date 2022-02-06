const { Router } = require ('express');
const { check } = require('express-validator');

const { validarCampos, validarArchivo } = require('../middleware');

const { cargarArchivo, actualizarImgCloud, mostrarImagen } = require ('../controllers/upload');
const { coleccionesPermitidas } = require('../helpers');

const router = Router ();

router.post ('/', validarArchivo, cargarArchivo);

router.put ('/:coleccion/:id', [
    check ('id', 'No es un ID valido').isMongoId (),
    check ('coleccion').custom (c => coleccionesPermitidas (c, ['usuario', 'producto'])),
    validarArchivo,
    validarCampos
], actualizarImgCloud);

router.get ('/:coleccion/:id', [
    check ('id', 'No es un ID valido').isMongoId (),
    check ('coleccion').custom (c => coleccionesPermitidas (c, ['usuario', 'producto'])),
    validarCampos
], mostrarImagen);

module.exports = router;