
const { Schema, model } = require ('mongoose'); 

const rolSchema = Schema ({

    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

module.exports = model ('Role', rolSchema);