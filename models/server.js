const cors = require('cors');
const express = require('express');
const fileUpload = require ('express-fileupload');

const { dbConnection } = require ('../database/config');
const { socketController } = require ('../sockets/controller');

class Server {

    constructor () {
        this.app  = express ();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.path = {
            auth:       '/api/auth/',
            buscar:     '/api/buscar/',
            categoria:  '/api/categoria/',
            producto:   '/api/producto/',
            usuarios:   '/api/usuarios/',
            upload:     '/api/upload/'
        }

        this.conectarBD ();
        this.middleware ();
        this.routes ();
        this.sockets ();
    }

    async conectarBD () {
        await dbConnection ();
    }

    middleware () {
        this.app.use (cors());
        this.app.use (express.json ());
        this.app.use ( express.static ('public'));
        this.app.use (fileUpload ({ useTempFiles : true, tempFileDir : '/tmp/', createParentPath: true }));
    }

    routes () {
        this.app.use (this.path.auth, require ('../routers/auth'));
        this.app.use (this.path.buscar, require ('../routers/buscar'));
        this.app.use (this.path.categoria, require ('../routers/categoria'));
        this.app.use (this.path.producto, require ('../routers/producto'));
        this.app.use (this.path.usuarios, require ('../routers/user'));
        this.app.use (this.path.upload, require ('../routers/upload'));
    }

    sockets () {
        this.io.on('connection', (socket) => { socketController ( socket, this.io ) });
    }

    listen () {
        this.server.listen(this.port, ()=> {
            console.log ('Servidor arriba escuchando en el puerto: ', this.port);
        });
    }

}

module.exports = Server;