"use strict";

//mongoose = require('mongoose');
const Video = require('../data/Mongoose/video');


const uploadButton = document.getElementById('btn-upload');

uploadButton.addEventListener('click', function() {
    // Obtén los valores del título, descripción y enlace del video
    const title = document.getElementById('video-title').value;
    const description = document.getElementById('video-description').value;
    const link = document.getElementById('video-link').value;

    // Verifica que los campos no estén vacíos
    if (title.trim() === '' || description.trim() === '' || link.trim() === '') {
        console.error('Todos los campos deben ser completados.');
        return;
    }

    if (sessionStorage.getItem('currentUser')) {
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))._uid;
        const newVideo = new Video(title, description, link, 0, currentUser, 1);

        // Aquí guardar el video en MongoDB a través de una solicitud fetch al servidor
        fetch('/registerVideo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newVideo),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue OK');
            }
            return response.json(); // O response.text() si la respuesta no es en formato JSON
        })
        .then(data => {
            console.log('Video subido exitosamente:', data); // Manejar la respuesta
        })
        .catch(error => {
            console.error('Hubo un problema con la petición fetch:', error);
        });
    } else {
        console.error('Inicia sesión antes de subir un video');
    }
});


function getCurrentUserId() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    return currentUser ? currentUser.ID : -1;
}
