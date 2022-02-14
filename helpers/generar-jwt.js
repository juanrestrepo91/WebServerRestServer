const jwt = require ('jsonwebtoken');
const { Usuario } = require('../models');

const generarJwt = ( uid = '' ) => {

    return new Promise ( (resolve, reject ) => {
        
        const payload = {uid};

        jwt.sign (payload, process.env.secretprivatekey, 
            { expiresIn: '4h' }, 
            ( err, token ) => {

                if (err) {
                    console.log (err);
                    reject (' No se pudo generar el Jwt');
                }
                else {
                    resolve (token);
                }
                
        })
    });
}

const comprobarJwt = async (token = '') => {

    try {
        if (token.length <= 10) {
            return null;
        }

        const { uid } = jwt.verify (token, process.env.secretprivatekey);

        const usuario = await Usuario.findById (uid);

        if (usuario) {
            return usuario;
        }
        else {
            return null;
        }
        
    } catch (error) {
        return null;
    }

}

module.exports = { generarJwt, comprobarJwt };