const validarCampos = require('../middleware/validar-campos');
const validarJwt = require ('../middleware/validar-jwt');
const validarRole = require ('../middleware/validar-role');

module.exports = { ...validarCampos, ...validarJwt, ...validarRole }