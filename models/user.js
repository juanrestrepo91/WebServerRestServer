
const { Schema, model } = require ('mongoose'); 

const usuarioSchema = Schema ({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        uniqued: true
    },
    password: {
        type: String,
        required: [true, 'La consatraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    }
});

module.exports = model ('Usuarios', usuarioSchema);