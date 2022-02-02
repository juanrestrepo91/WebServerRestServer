const { response, request } = require ('express');
const Usuario = require ('../models/user');
const bcryptjs = require ('bcryptjs');

const usuarioGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - Controller ',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuarioPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    
    const usuario = new Usuario ({nombre, correo, password, rol});

    const salt = bcryptjs.genSaltSync ();

    usuario.password = bcryptjs.hashSync (password, salt);

    await usuario.save ();

    res.json({ usuario });
};

const usuarioPut = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, password, google, ...resto } = req.body;

    if (password) {

        const salt = bcryptjs.genSaltSync ();
        resto.password = bcryptjs.hashSync (password, salt);
    }

    const actualiza = await Usuario.findByIdAndUpdate (id, resto);

    res.json({actualiza});
};

const usuarioDel = (req, res) => {
    res.json({
        msg: 'Delete API - Controller '
    });
};

module.exports = { usuarioGet, usuarioPost, usuarioPut, usuarioDel }