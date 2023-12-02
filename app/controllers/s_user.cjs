"use strict";

//mongoose = require('mongoose');
const User = require('../data/Mongoose/user');

const storedUser = sessionStorage.getItem('currentUser');
console.log(sessionStorage.getItem('currentUser'));
if (storedUser) {
    console.log('hola');
    disableLoginRegisterButtons();
}
else{
    console.log("Hola");
    enableLoginRegisterButtons();
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
            const newUser = new User(email, password, "userIcon.jpg", 0, [], [] );
        
            try {
                // Call the createUser function to add the new user
                createUser(newUser);
                console.log('User registered successfully!');
                sessionStorage.setItem('currentUser', JSON.stringify(newUser));
                disableLoginRegisterButtons();
                //Aquí mandar al newUser a la base de datos
                fetch('/registerUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newUser),
                })
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

const loginButton = document.getElementById('btn-login');

// Agrega un controlador de eventos al botón de iniciar sesión
loginButton.addEventListener('click', function() {
    // Obtén los valores del correo y la contraseña
    const email = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    // Llama a la función loginUser para iniciar sesión
    try {
        const user = loginUser(email, password);

        // Verifica si el inicio de sesión fue exitoso
        if (user) {
            // Almacena el usuario en la sesión
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            // Deshabilita los botones de inicio de sesión y registro
            disableLoginRegisterButtons();

            console.log('Inicio de sesión exitoso.');
        } else {
            console.error('Credenciales incorrectas. Verifica tu correo y contraseña.');
        }
        let storedUser = sessionStorage.getItem('currentUser');
        console.log(storedUser);
    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
    }
});


async function loginUser(email, password) {
    // Aquí deberías hacer la lógica para buscar en tu JSON en MongoDB
    // y verificar si el usuario y la contraseña coinciden
    const user = await User.findOne({ email, password }).exec();
    // Supongamos que usersJSON es tu JSON con la información de los usuarios
    const usersJSON = {
        "total-users": 1,
        "users": [
            {
                "ID": 1,
                "email": "mail@yahoo.com",
                "password": "OdioLosPatos",
                "avatar": "path_to_avatar3.png",
                "admin": 0,
                "videoIDs": [1, 2, 3]
            }
        ]
    };

    // Busca el usuario en el JSON
    user = usersJSON.users.find(u => u.email === email && u.password === password);

    return user;
}