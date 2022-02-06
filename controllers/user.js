const { response, request } = require ('express');
const bcryptjs = require ('bcryptjs');

const { Usuario } = require ('../models');

const usuarioGet = async (req = request, res = response) => {

    const { from = 0, limit = 100} = req.query; 

    const [usuarios, count] = await Promise.all ([
        Usuario.find ({estado: true})
        .skip (parseInt (from))
        .limit (parseInt (limit)),
        Usuario.countDocuments({estado: true})
    ])

    res.json({count, usuarios});
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

    const actualiza = await Usuario.findByIdAndUpdate (id, resto, { new: true });

    res.json(actualiza);
};

const usuarioDel = async (req, res) => {

    const { id } = req.params;

    //const elimina = await Usuario.findByIdAndDelete (id);

    const usuario = await Usuario.findByIdAndUpdate (id, {estado: false});

    res.json(usuario);
};

module.exports = { usuarioGet, usuarioPost, usuarioPut, usuarioDel }