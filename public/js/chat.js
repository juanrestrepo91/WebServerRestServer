
let usuario = null;
let socket = null;

const txtuid = document.querySelector('#txtuid');
const txtmensaje = document.querySelector('#txtmensaje');
const lUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnsalir = document.querySelector('#btnsalir');

const url = window.location.hostname.includes ('localhost') 
                ? `http://${window.location.host}/api/auth/`
                : `https://${window.location.host}/api/auth/`;

const validarJWT = async () => {

    const token = localStorage.getItem ('token') || ''

    if (token.length <= 10) {
        window.location = 'index.html'
        throw new Error ('No hay token en el servidor');
    }

    const resp = await fetch (url, {
        headers: { 'x-token': token}
    }).then (res => res.json ())
    .then ( ({ usuario, token, msg }) => {

        if (msg) {
            return console.error (msg);
        }
    
        localStorage.setItem ('token', token);

        document.title = usuario.nombre;
        conectarSocket ();
    })
}

const conectarSocket = async () => {

    socket = io ({ 'extraHeaders': {
        'x-token': localStorage.getItem ('token')
    } });

    socket.on ('connect', () => {
        console.log ('Sockets Online');
    });

    socket.on ('disconnect', () => {
        console.log ('Sockets Offline');
    });

    socket.on ( 'usuarios-activos', dibujarUsuario );

    socket.on ( 'recibir-mensaje', dibujarMensaje );

    socket.on ('mensaje-privado', ( payload ) => {
        console.log (payload);
    })
}

const dibujarUsuario = ( usuarios = [] ) => {

    let usershtml = ''

    usuarios.forEach ( ({ nombre, uid }) => {

        usershtml += `
            <li>
                <p>
                    <h5 class='text-success'> ${ nombre } </h5>
                    <span class='fs-6 text-muted'> ${ uid } </span>
                </p>
            </li>
        `;      
    });

    lUsuarios.innerHTML = usershtml;

}

const dibujarMensaje = ( mensajes = [] ) => {

    let usershtml = ''

    mensajes.forEach ( ({ nombre, mensaje }) => {

        usershtml += `
            <li>
                <p>
                    <span class='text-primary'> ${ nombre } </span>
                    <span> ${ mensaje } </span>
                </p>
            </li>
        `;      
    });

    ulMensajes.innerHTML = usershtml;

}

txtmensaje.addEventListener ('keyup', ({ keyCode }) => {

    const mensaje = txtmensaje.value;
    const uid     = txtuid.value;

    if (keyCode !== 13 ) {
        return null;
    }
    if (!mensaje) {
        return null;
    }

    socket.emit ('enviar-mensaje', { mensaje, uid });

    txtmensaje.value = '';

});

const main = async () => {
    await validarJWT ();
}

main ();