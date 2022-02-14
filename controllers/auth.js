const { response, request } = require ('express');
const bcriptjs = require('bcryptjs');

const Usuario = require ('../models/user');
const { generarJwt } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const loginGoogle = async (req = request, res = response) => {

    const { id_token } = req.body;
    
    try {
     
        const { nombre, img, correo } = await googleVerify (id_token);

        let usuario = await Usuario.findOne ({ correo });

        if (!usuario) {

            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true,
                rol: 'USER_ROLE'
            }

            usuario = new Usuario (data);

            await usuario.save ();

        }

        if (!usuario.estado) {
            res.status (401).json ({ msg: 'Hable con el administrador, usuario bloqueado' });
        }

        const token = await generarJwt (usuario.id);

        res.json ({ msg: 'todo bien', usuario, token });
        // res.json ({ msg: 'todo bien' });

    } catch (err) {
        console.log (err);
        res.status (500).json ({ msg: 'Problemas en el servidor'});  
    }

}

const renovarToken = async (req = request, res = response) => {

    const { usuario } = req;

    const token = await generarJwt (usuario.id);

    res.json ({usuario, token});

}

module.exports = { login, loginGoogle, renovarToken }