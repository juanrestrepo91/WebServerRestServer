const { response, request } = require ('express');

const { Producto }  = require ('../models');


const obtenerProducto = async (req = request, res = response) => {

    try {

        const { id } = req.params;

        const consulta = await Producto.findById ( id )
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');

        res.json( consulta );

    } catch (error) {
        console.log (error);
        return res.status(500).json ({ msg: 'Id no valido '});
    }
}

const consultarProductos = async (req = request, res = response) => {

    const { from = 0, limit = 100} = req.query; 

    const [productos, count] = await Promise.all ([
        Producto.find ({estado: true})
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip (parseInt (from))
        .limit (parseInt (limit)),
        Producto.countDocuments({estado: true})
    ])

    res.json({count, productos});
}

const guardarProducto = async (req = request, res = response) => {

    try {

        const { estado, usuario, ...body } = req.body;

        let producto = await Producto.findOne ({ nombre: body.nombre });

        if (producto) {
            return res.status (401).json({ msg: 'La producto ya existe' }); 
        }

        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            usuario: req.usuario._id
        }

        producto = new Producto (data);

        producto.save ();

        res.status (201).json( producto );

    } catch (error) {
        console.log (error);
        return res.status(500).json ({ msg: 'Error del servidor '});
    }
}

const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params;

    const { estado, usuario, ...body } = req.body;

    if (body.nombre) {
        body.nombre = nombre.toUpperCase()
    }

    data = {
        ...body,
        usuario: req.usuario.id
    }

    const actualiza = await Producto.findByIdAndUpdate (id, data, { new: true });

    res.json(actualiza);

}

const eliminarProducto = async (req, res) => {

    const { id } = req.params;

    //const elimina = await Usuario.findByIdAndDelete (id);

    const producto = await Producto.findByIdAndUpdate (id, {estado: false}, { new: true });

    res.json (producto);

};

module.exports = { 
    consultarProductos,
    guardarProducto,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto 
}