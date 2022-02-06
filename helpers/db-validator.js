const Role = require ('../models/role');
const { Usuario, Categoria, Producto } = require ('../models');
const req = require('express/lib/request');

const esRolValido = async (role = '') => {
    const existeRole = await Role.findOne ({role});

    if (!existeRole)
        throw new Error (`El rol ${ role } no esta registado en la BD`);
}

const emailExiste = async (correo = '') => {

    const existeEmail = await Usuario.findOne ({ correo });

    if (existeEmail) {
        throw new Error (`El correo ${correo} ya se encuentra registrado`);
    }
}

const existeID = async (id) => {

    const existeUsuario = await Usuario.findById (id);

    if (!existeUsuario) 
        throw new Error (`El ID ingresado: ${id} no existe`);
}

const existeCategoriaID = async (id) => {

    const existeCategoria = await Categoria.findById (id);

    if (!existeCategoria) 
        throw new Error (`El ID ingresado: ${id} no existe`);
}

const existeProductoID = async (id) => {

    const existeProducto = await Producto.findById (id);

    if (!existeProducto) 
        throw new Error (`El ID ingresado: ${id} no existe`);

    req.producto = existeProducto;
}

const coleccionesPermitidas = (coleccion = '', colecciones = [] ) => {

    if (!colecciones.includes (coleccion)) {
        throw new Error (`La colección ${ coleccion } no es permitida, ${colecciones}`);
    }
    return true;
}

module.exports = { 
    esRolValido, emailExiste, existeID, existeCategoriaID, existeProductoID, coleccionesPermitidas
}