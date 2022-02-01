const { response, request } = require ('express');

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

const usuarioPost = (req = request, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - Controller ',
        nombre,
        edad
    });
};

const usuarioPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - Controller ',
        identificacion: id
    });
};

const usuarioDel = (req, res) => {
    res.json({
        msg: 'Delete API - Controller '
    });
};

module.exports = { usuarioGet, usuarioPost, usuarioPut, usuarioDel }