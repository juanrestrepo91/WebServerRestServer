
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

    const error = validationResult (req);

    if (!error.isEmpty())
        return res.status (400).json (error);

    next ();
}


module.exports = { validarCampos }
    // check('nombre', 'El nombre es obligatorio').not ().isEmpty (),
    // check('password', 'Es obligatorio y mayor a 6 caracteres').isLength ({min: 6}),
    // check('correo', 'Correo no es valido').isEmail (),
    // check('rol', 'No es un rol valido').isIn (['ADMIN_ROLE', 'USER_ROLE'])