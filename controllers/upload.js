const path = require('path');
const { request, response } = require("express");
const fs = require ('fs');
const cloudinary = require('cloudinary').v2

cloudinary.config (process.env.CLOUDINARY_URL);

const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");



const cargarArchivo = async (req = request, res = response) => {

    try {
        const nombre = await subirArchivo (req.files, undefined, 'img');

        res.json ({nombre});
        
    } catch (error) {
        res.status(400). json ({error});  
    }
    

}

const actualizarImgUsuario = async (req = request, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
    
        case 'usuario':
            modelo = await Usuario.findById (id);
        
            if (!modelo)
                return res.status (400).json ({ msg: `No existe un usuario para el id: ${id}` });
        
        break;
    
        case 'producto':
            modelo = await Producto.findById (id);
        
            if (!modelo)
                return res.status (400).json ({ msg: `No existe un usuario para el id: ${id}` });
        
        break;  
      
        default:
            res.status (500).json ({ msg: 'Se me olvido programar esta parte' });
            break;
    }

    if (modelo.img) {
        const pathimagen = path.join (__dirname, '../upload', coleccion, modelo.img);

        if (fs.existsSync (pathimagen)) {
            fs.unlinkSync (pathimagen);
        }
    }

    const nombre = await subirArchivo (req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save ();

    res.json (modelo);
}

const mostrarImagen = async (req = request, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
    
        case 'usuario':
            modelo = await Usuario.findById (id);
        
            if (!modelo)
                return res.status (400).json ({ msg: `No existe un usuario para el id: ${id}` });
        
        break;
    
        case 'producto':
            modelo = await Producto.findById (id);
        
            if (!modelo)
                return res.status (400).json ({ msg: `No existe un usuario para el id: ${id}` });
        
        break;  
      
        default:
            res.status (500).json ({ msg: 'Se me olvido programar esta parte' });
            break;
    }

    if (modelo.img) {
        const pathimagen = path.join (__dirname, '../upload', coleccion, modelo.img);

        if (fs.existsSync (pathimagen)) {
            return res.sendFile (pathimagen);
        }
    }

    res.sendFile (path.join (__dirname, '../assets/no-image.jpg'));
}

const actualizarImgCloud = async (req = request, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
    
        case 'usuario':
            modelo = await Usuario.findById (id);
        
            if (!modelo)
                return res.status (400).json ({ msg: `No existe un usuario para el id: ${id}` });
        
        break;
    
        case 'producto':
            modelo = await Producto.findById (id);
        
            if (!modelo)
                return res.status (400).json ({ msg: `No existe un usuario para el id: ${id}` });
        
        break;  
      
        default:
            res.status (500).json ({ msg: 'Se me olvido programar esta parte' });
            break;
    }

    if (modelo.img) {
        const nombrearr = modelo.img.split ('/');
        const nombre    = nombrearr[nombrearr.length - 1];
        const [public_id] = nombre.split ('.');

        cloudinary.uploader.destroy (public_id);
    }

    const { tempFilePath } = req.files.archivo;

    const { secure_url } = await cloudinary.uploader.upload (tempFilePath);

    modelo.img = secure_url;

    await modelo.save ();

    res.json (modelo);
}

module.exports = { 
    cargarArchivo, 
    actualizarImgUsuario,
    mostrarImagen,
    actualizarImgCloud 
}