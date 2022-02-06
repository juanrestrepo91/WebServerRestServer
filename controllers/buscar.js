const { response, request } = require ('express');
const { ObjectId } = require ('mongoose').Types;

const { Usuario, Categoria, Producto } = require ('../models');

const buscar = (req = request, res = response) => {

     
    const { coleccion, termino } = req.params;
    
    const coleccionesPermitidas = ['usuario', 'categoria', 'producto', 'role'];
    
    if (!coleccionesPermitidas.includes (coleccion)) {
        return res.status(400).json ({ msg: `Las colecciones permitiadas son: ${coleccionesPermitidas}` });
    }
    
    switch (coleccion) {
        case 'usuario':
            buscarUsuario (termino, res);
            break;

        case 'categoria':
            buscarCategoria (termino, res);
            break;

        case 'producto':
            buscarProducto (termino, res);
            break;

        default:
            return res.status (500). json ({ msg: 'No se programo esta opción' });
    }
}

const buscarUsuario = async (termino = '', res = response) => {

    try {

        const esMongoID = ObjectId.isValid (termino);

        if (esMongoID) {
            
            const usuario = await Usuario.findById (termino);

            return res.json({ results: (usuario) ? [ usuario ] : [] });
        }

        const regexp = new RegExp (termino, 'i');

        const usuarios = await Usuario.find ({
            $or: [ {nombre: regexp}, {correo: regexp} ],
            $and: [ {estado: true} ]
        });

        res.json ({ results: usuarios });

    } catch (error) {
        console.log (error);
        return res.status(500).json ({ msg: 'Error del servidor '});
    }
}

const buscarCategoria = async (termino = '', res = response) => {

    try {

        const esMongoID = ObjectId.isValid (termino);

        if (esMongoID) {
            
            const categoria = await Categoria.findById (termino).populate ('usuario', 'nombre');

            return res.json({ results: (categoria) ? [ categoria ] : [] });
        }

        const regexp = new RegExp (termino, 'i');

        const categorias = await Categoria.find ({
            $or: [ {nombre: regexp, estado: true} ]
        }).populate ('usuario', 'nombre');

        res.json ({ results: categorias });

    } catch (error) {
        console.log (error);
        return res.status(500).json ({ msg: 'Error del servidor '});
    }
}

const buscarProducto = async (termino = '', res = response) => {

    try {

        const esMongoID = ObjectId.isValid (termino);

        if (esMongoID) {
            
            const producto = await Producto.findById (termino).populate ('categoria', 'nombre');

            return res.json({ results: (producto) ? [ producto ] : [] });
        }

        const regexp = new RegExp (termino, 'i');

        const productos = await Producto.find ({
            $or: [ {nombre: regexp, estado: true} ]
        }).populate ('categoria', 'nombre');

        res.json ({ results: productos });

    } catch (error) {
        console.log (error);
        return res.status(500).json ({ msg: 'Error del servidor '});
    }
}
module.exports = { buscar }