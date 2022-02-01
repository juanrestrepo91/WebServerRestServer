
const mongodb = require ('mongoose');


const dbConnection = async () => {
    try {
        console.log (process.env.MONDODB);
        await mongodb.connect ('mongodb+srv://user_cafe_nodejs:DiIbwgk3WTJVa8Jy@cafedbnodejs.kprsf.mongodb.net/cafedb', {
            useNewUrlParser: true
        });
        
        console.log ('Base de datos arriba');
    } catch (error) {
        console.log (error);
        throw new Error ('Error al momento de iniciar la base de datos');
    }
}

module.exports = {dbConnection}