const cors = require('cors');
const express = require('express');
const { dbConnection } = require ('../database/config');

class Server {

    constructor () {
        this.app  = express ();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios/';

        this.conectarBD ();
        this.middleware ();
        this.routes (); 
    }

    async conectarBD () {
        await dbConnection ();
    }

    middleware () {

        this.app.use (cors());
        this.app.use (express.json ());
        this.app.use ( express.static ('public'));
    }

    routes () {
    
        this.app.use (this.usuariosPath, require ('../routers/user.js'));
    }

    listen () {
        this.app.listen(this.port, ()=> {
            console.log ('Servidor arriba escuchando en el puerto: ', this.port);
        });
    }

}

module.exports = Server;