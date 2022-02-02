const Role = require ('../models/role');
const Usuario = require ('../models/user');

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

module.exports = { esRolValido, emailExiste }