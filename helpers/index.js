
const dbValidator = require ('./db-validator');
const generarJwt = require ('./generar-jwt');
const googleVerify = require ('./google-verify');
const subirArchivo = require ('./subir-archivo');

module.exports = { ...dbValidator, ...generarJwt, ...googleVerify, ...subirArchivo }