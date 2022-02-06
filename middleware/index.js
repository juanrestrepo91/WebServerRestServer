const validarCampos = require('../middleware/validar-campos');
const validarJwt = require ('../middleware/validar-jwt');
const validarRole = require ('../middleware/validar-role');
const validarArchivo = require ('../middleware/validar-archivo');

module.exports = { ...validarCampos, ...validarJwt, ...validarRole, ...validarArchivo }