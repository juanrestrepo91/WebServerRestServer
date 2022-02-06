const { v4: uuidv4 } = require('uuid');
const path = require ('path');

const subirArchivo = (files, extPermitidas = ['jpg', 'png', 'jpeg'], carpeta = '') => {

    return new Promise ((resolve, reject) => {
        
        const { archivo } = files;
        const nombreArray = archivo.name.split ('.');
        const ext = nombreArray[nombreArray.length-1];

        if (!extPermitidas.includes (ext)) {
           return reject (`El archivo no tiene un extensión permitida ${extPermitidas }`);
        }

        const nombreTmp = uuidv4() + '.' + ext;
        const uploadPath = path.join ( __dirname, '../upload/', carpeta, nombreTmp);

        archivo.mv (uploadPath, (err) => {

            if (err) {
                return reject (err);
            }

            resolve (nombreTmp);

        });

    });
}

module.exports = { subirArchivo }