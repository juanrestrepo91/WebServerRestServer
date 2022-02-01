const Role = require ('../models/role');

const esRolValido = async (role = '') => {
    const existeRole = await Role.findOne ({role});

    if (!existeRole)
        throw new Error (`El rol ${ role } no esta registado en la BD`);
}

module.exports = { esRolValido }