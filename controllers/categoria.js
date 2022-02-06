const { response, request } = require ('express');

const { Categoria } = require ('../models');

const obtenerCategoria = async (req = request, res = response) => {

    try {

        const { id } = req.params;

        const consulta = await Categoria.findById ( id ).populate('usuario', 'nombre');

        res.json(consulta);

    } catch (error) {
        console.log (error);
        return res.status(500).json ({ msg: 'Id no valido '});
    }
}

const obtenerCategorias = async (req = request, res = response) => {

    try {

        const { from = 0, limit = 100} = req.query; 

        const [categorias, count] = await Promise.all ([
            Categoria.find ({ estado: true }).populate('usuario', 'nombre')
            .skip (parseInt (from))
            .limit (parseInt (limit)),
            Categoria.countDocuments({ estado: true })
        ])

        res.json({count, categorias});

    } catch (error) {
        console.log (error);
        return res.status(500).json ({ msg: 'Id no valido '});
    }
}

const guardarCategoria = async (req = request, res = response) => {

    try {

        const nombre = req.body.nombre.toUpperCase();

        let categoria = await Categoria.findOne ({ nombre });

        if (categoria) {
            return res.status (401).json({ msg: 'La categoria ya existe' }); 
        }

        const data = {
            nombre,
            usuario: req.usuario._id
        }

        categoria = new Categoria (data);

        categoria.save ();

        res.status (201).json( categoria );

    } catch (error) {
        console.log (error);
        return res.status(500).json ({ msg: 'Error del servidor '});
    }
}

const actualizarCategoria = async (req = request, res = response) => {

    const { id } = req.params;

    const { nombre } = req.body;

    data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuario.id
    }

    const actualiza = await Categoria.findByIdAndUpdate (id, data, { new: true });

    res.json(actualiza);

}

const eliminarCategoria = async (req, res) => {

    const { id } = req.params;

    //const elimina = await Usuario.findByIdAndDelete (id);

    const usuario = await Categoria.findByIdAndUpdate (id, {estado: false}, { new: true });

    res.json(usuario);

};

module.exports = { 
    guardarCategoria, 
    obtenerCategoria, 
    obtenerCategorias, 
    actualizarCategoria,
    eliminarCategoria 
}