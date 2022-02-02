const jwt = require ('jsonwebtoken');

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

module.exports = { generarJwt };