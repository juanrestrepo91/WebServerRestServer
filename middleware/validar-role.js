const { request, response } = require("express")

const validarRole = (req = request, res = response, next) => {

    if (!req.usuario) {
        return res.status (500).json ({ msg: 'Se quiere validar el role sin validar el token' });  
    }

    const { rol, nombre, estado } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status (401).json ({ msg: `El usuario: ${nombre} no esta autorizado` });
    }

    try {
        next ();
    }
    catch (error) {
        return res.status (401).json ({ msg: 'Role no valido' });
    }
    
}

const tieneRol = ( ...roles ) => {

    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status (500).json ({ msg: 'Se quiere validar el role sin validar el token' });  
        }

        if (!roles.includes (req.usuario.rol)) {
            return res.status (401).json ({ msg: `Se requiere uno de los siguientes roles ${roles} para poder continuar` });  
        }

        next ();
    }
}

module.exports = { validarRole, tieneRol }