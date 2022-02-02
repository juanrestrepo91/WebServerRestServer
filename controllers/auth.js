const { response, request } = require ('express');
const bcriptjs = require('bcryptjs');

const Usuario = require ('../models/user');
const { generarJwt } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {

    try {

        const { correo, password } = req.body;

        const usuario = await Usuario.findOne ({correo});
    
        if (!usuario) {
            return res.status (400).json ({ msg: `El usuario con correo: ${correo} no existe` }); 
        }
    
        if (!usuario.estado) {
            return res.status (400).json ({ msg: `El usuario se encuentra inactivo` }); 
        }

        const pass = bcriptjs.compareSync (password, usuario.password);

        if (!pass) {
            return res.status (400).json ({ msg: 'Constraseña invalida' }); 
        }
    
        const token = await generarJwt (usuario.id);

        res.json({
            usuario,
            token
        });  

    } catch (error) {
        return res.status(500).json ({ msg: 'Error del servidor '});
    }
}

module.exports = { login }