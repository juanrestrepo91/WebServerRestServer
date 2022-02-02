
const mongodb = require ('mongoose');


const dbConnection = async () => {
    try {

        await mongodb.connect (process.env.MONGODB, {
             useNewUrlParser: true
        });
        
        console.log ('Base de datos arriba');
    } catch (error) {
        console.log (error);
        throw new Error ('Error al momento de iniciar la base de datos');
    }
}

module.exports = {dbConnection}