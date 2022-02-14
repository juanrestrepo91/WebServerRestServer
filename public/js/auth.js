
const miformulario = document.querySelector('form');

const url = window.location.hostname.includes ('localhost') 
                ? `http://${window.location.host}/api/auth/`
                : `https://${window.location.host}/api/auth/`;

miformulario.addEventListener ('submit', env => {
    env.preventDefault ();
    const formData = {};

    for (let el of miformulario.elements) {
        if (el.name.length > 0)
            formData[el.name] = el.value;
    }
    
    fetch (url + 'login', {
        method: 'POST',
        body: JSON.stringify (formData),
        headers: { 'Content-Type': 'application/json'}
    })
    .then ( resp => resp.json ())
    .then ( ({ msg, token }) => {

        if (msg) {
            return console.error (msg);
        }

        localStorage.setItem ('token', token);
        window.location = 'chat.html';
    })
});

function onSignIn (response) {

    const token = { id_token: response.credential };

    fetch (url + 'google', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
    },
    body: JSON.stringify (token)
    }).then (resp => resp.json())
    .then ( ({ token }) => {
        localStorage.setItem ('token', token);
        window.location = 'chat.html';
    })
    .catch (err => { console.log (err)})

}

const button = document.getElementById ('google-signout');

button.onclick = () => {
    google.accounts.id.disableAutoSelect ();
    google.accounts.id.revoke (localStorage.getItem ('token'), () => {
        localStorage.clear ();
        location.reload ();
    });

};