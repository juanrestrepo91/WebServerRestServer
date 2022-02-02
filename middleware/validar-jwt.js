const { request, response } = require('express');
const jwt = require ('jsonwebtoken');

const Usuario = require ('../models/user');

const validarJwt = async (req = request, res = response, next) => {
    
    const token = req.header ('x-token');

        if (!token) {
            return res.status (401).json ({ msg: 'No se encontró token en la petición' });   
        }

    try {

        const { uid } = jwt.verify (token, process.env.secretprivatekey);

        const usuarioAuth = await Usuario.findById (uid);

        if (!usuarioAuth) {
            return res.status (401).json ({ msg: 'Usuario no existe' });
        }

        if (!usuarioAuth.estado) {
            return res.status (401).json ({ msg: 'Usuario con estado inactivo' });
        }

        req.usuario = usuarioAuth;

        next ();
        
    } catch (error) {
        return res.status (401).json ({ msg: 'Token no valido' });
    }
}

module.exports = {validarJwt }