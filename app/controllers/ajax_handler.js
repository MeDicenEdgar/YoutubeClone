"use strict";

//mongoose = require('mongoose');
//const User = require('../data/Mongoose/user');
//const Video = require('../data/Mongoose/video');

const uploadButton = document.getElementById('btn-upload');
const storedUser = sessionStorage.getItem('currentUser');
const loginButton = document.getElementById('btn-login');

console.log(sessionStorage.getItem('currentUser'));
if (storedUser) {
    console.log('hola');
    disableLoginRegisterButtons();
}
else{
    console.log("Hola");
    enableLoginRegisterButtons();
}
function generateUID() {
    return Math.floor(100000 + Math.random() * 900000);
}
const registerBtn = document.getElementById('btn-reg');
registerBtn.addEventListener('click', function() {
    
    // Get user input values from the text fields
    
    const email = document.getElementById('correo-reg').value;
    const password = document.getElementById('password-reg').value;
    const confirm = document.getElementById('password-confirm').value;
    if (password.value===confirm.value) {
    // Create a new user object
        if (email.trim() !== '') {
            // Create a new user object
            const newUser = {
                "_uid" : generateUID(),
                "email": email,
                "password": password,
                "avatar": "path_to_avatar3.png",
                "admin": 0,
                "videoIDs": []
            };
            fetch('http://localhost:3000/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Manejo adicional si es necesario
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        
            try {
                // Call the createUser function to add the new user
                //createUser(newUser);
                console.log('User registered successfully!');
                sessionStorage.setItem('currentUser', JSON.stringify(newUser));
                disableLoginRegisterButtons();
                //Aquí mandar al newUser a la base de datos

            } catch (error) {
                console.error('Error registering user:', error.message);
            }
        } else {
            console.error('Email cannot be empty.');
        }
    }
});

function disableLoginRegisterButtons() {
    const loginButton = document.getElementById('iniciar-sesion');
    const registerBtn = document.getElementById('registro');

    if (loginButton) {
        loginButton.classList.add('disabled');
    
    }

    if (registerBtn) {
        registerBtn.classList.add('disabled');
    }
}

function enableLoginRegisterButtons(){
    const loginButton = document.getElementById('iniciar-sesion');
    const registerBtn = document.getElementById('registro');
    loginButton.disabled = false;
    registerBtn.disabled = false;
}

const logoutButton = document.getElementById('logoutButton');

// Agrega un controlador de eventos al botón de cerrar sesión
logoutButton.addEventListener('click', function() {
    // Elimina el usuario almacenado en la sesión
    sessionStorage.removeItem('currentUser');
    // Vuelve a habilitar los botones de inicio de sesión y registro
    enableLoginRegisterButtons();
    // Otro código relacionado con cerrar sesión si es necesario
    console.log('Sesión cerrada exitosamente.');
});


// Agrega un controlador de eventos al botón de iniciar sesión
loginButton.addEventListener('click', async function() {
    // Obtén los valores del correo y la contraseña
    const email = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    try {
        const user = await loginUser(email, password);

        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            disableLoginRegisterButtons();
            console.log('Inicio de sesión exitoso.');
        } else {
            console.error('Credenciales incorrectas. Verifica tu correo y contraseña.');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
    }
});



function loginUser(email, password) {
    // Aquí deberías hacer la lógica para buscar en tu JSON en MongoDB
    // y verificar si el usuario y la contraseña coinciden
    return fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error during login:', error);
        return null;
    });
}
uploadButton.addEventListener('click', function() {
    const title = document.getElementById('video-title').value;
    const description = document.getElementById('video-description').value;
    const url = document.getElementById('video-link').value;

    if (title.trim() === '' || description.trim() === '' || url.trim() === '') {
        console.error('Todos los campos deben ser completados.');
        return;
    }

    if (sessionStorage.getItem('currentUser')) {
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        console.log(currentUser);
        const userId = currentUser.email;
        const newVideo={
            "title" : title,
            "description" : description,
            "url" : url,
            "userId":userId
        };

        fetch('http://localhost:3000/uploadVideo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newVideo)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al subir el video');
            }
            return response.json();
        })
        .then(data => {
            console.log('Video subido exitosamente:', data);
        })
        .catch(error => {
            console.error('Error durante la subida:', error);
        });
    }
    else {
        console.error('Inicia sesión antes de subir un video');
    }
});

