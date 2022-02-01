const { response } = require ('express');

const usuarioGet = () => (req, res = response) => {
    res.json({
        msg: 'get API - Controller '
    });
}

const usuarioPost = () => (req, res = response) => {
    res.json({
        msg: 'post API - Controller '
    });
};

const usuarioPut = () => (req, res) => {

    console.log (req);
    res.json({
        msg: 'put API - Controller '
    });
};

const usuarioDel = () =>  (req, res) => {
    res.json({
        msg: 'Delete API - Controller '
    });
};

module.exports = { usuarioGet, usuarioPost, usuarioPut, usuarioDel }