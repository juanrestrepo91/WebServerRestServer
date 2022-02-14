const { comprobarJwt } = require ('../helpers');
const { ChatMensaje } = require('../models');

const chatMensaje = new ChatMensaje ();

const socketController = async ( socket, io ) => {

    const usuario = await comprobarJwt (socket.handshake.headers['x-token']);

    if (!usuario) {
        throw new Error ('El usuario no fue encontrado');
    }

    chatMensaje.conectarUsuario (usuario);

    io.emit ('usuarios-activos', chatMensaje.usuariosArr);

    io.emit ('recibir-mensaje', chatMensaje.ultimos10);

    socket.join ( usuario.id );

    socket.on ('disconnect', () => {
        io.emit ('usuarios-activos', chatMensaje.usuariosArr);
    });

    socket.on ('enviar-mensaje', ({ mensaje, uid }) => {

        if (uid) {
            socket.to (uid).emit ('mensaje-privado', { de: usuario.nombre, mensaje });
        }
        else {
            chatMensaje.enviarMensajes (usuario.id, usuario.nombre, mensaje);
            io.emit ('recibir-mensaje', chatMensaje.ultimos10);
        }

    })

}

module.exports = { socketController }