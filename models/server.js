const cors = require('cors');
const express = require('express');

class Server {

    constructor () {
        this.app  = express ();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios/';

        this.middleware ();
        this.router (); 
    }

    middleware () {

        this.app.use (cors());

        this.app.use (express.json ());

        this.app.use ( express.static ('public'));
    }

    router () {
    
        this.app.use (this.usuariosPath, require ('../routers/user.js'));
    }

    listen () {
        this.app.listen(this.port, ()=> {
            console.log ('Servidor arriba escuchando en el puerto: ', this.port);
        });
    }

}

module.exports = Server;