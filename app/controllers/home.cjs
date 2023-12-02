"use strict";

//let storedUser = sessionStorage.getItem('currentUser');
const videoItems = document.querySelectorAll('.videos-videos .video-item');

function hideAdminButton(currentUser) {
    console.log(currentUser);
    const adminButtons = document.querySelectorAll('.btn-admin');

    // Itera sobre cada botón de administrador y ocúltalo si el usuario no tiene permisos de administrador
    adminButtons.forEach(button => {
        if (currentUser && currentUser._admin === 0) {
            button.style.display = 'none';
        } else {
            button.style.display = 'block';
        }
    });
}

// Llama a la función hideAdminButton pasando el usuario actual almacenado en sessionStorage
hideAdminButton(JSON.parse(sessionStorage.getItem('currentUser')));

const searchBar = document.getElementById('barra-busqueda');

searchBar.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const searchText = searchBar.value.toLowerCase();

        videoItems.forEach(videoItem => {
            const videoTitle = videoItem.querySelector('.video-info h6').textContent.toLowerCase();
            
            const userName = videoItem.querySelector('.video-info button').textContent.toLowerCase();

            if (videoTitle.includes(searchText) || userName.includes(searchText) || searchText === '') {
                videoItem.style.display = 'block'; // Muestra el elemento
            } else {
                videoItem.style.display = 'none'; // Oculta el elemento
            }
        });
    }
});

function matrizVideos() {
    console.log('ola');
    fetch('http://localhost:3000/getvideos', {
                method: 'GET'
            })
    .then(response => response.json())
    .then(data => actualizarVideoItems(data))
    .catch(error => console.error('Error al cargar videos:', error));
}

matrizVideos();

function actualizarVideoItems(matrizVideos) {
    console.log('entré');
    console.log(matrizVideos);
    matrizVideos = matrizVideos
    console.log(matrizVideos);
    const videoItems = document.querySelectorAll('.videos-videos .video-item');

    videoItems.forEach((videoItem, index) => {
            const videoTitleElement = videoItem.querySelector('.video-info h6');
            const userNameElement = videoItem.querySelector('.video-info button');
            const linkElement = videoItem.querySelector('.video-link');
            const likesCounterElement = videoItem.querySelector('.like-counter');
            const adminButton = videoItem.querySelector('.btn-admin')
        
        if (index < matrizVideos.length) {
            
            videoTitleElement.textContent = matrizVideos[index].title;
            userNameElement.textContent = '@' + matrizVideos[index].username;
            linkElement.href = matrizVideos[index].url;
            likesCounterElement.textContent = matrizVideos[index].likes;

            // Muestra el elemento de video actual
            videoItem.style.display = 'block';
        } else {
            // Oculta el elemento de video si no hay datos correspondientes
            videoItem.style.display = 'none';
        }

        adminButton.addEventListener('click', function () {
            let itemDeleted = matrizVideos[index];
            const videoId = itemDeleted._id; // Supongo que el ID del video está almacenado en el objeto itemDeleted
            console.log(videoId);
            fetch(`http://localhost:3000/video/${videoId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.status === 200) {
                    console.log('Video deleted');
                    // Aquí puedes ocultar el elemento de la lista o hacer cualquier otra acción después de eliminar con éxito
                    videoItem.style.display = 'none';
                } else if (response.status === 404) {
                    console.log('Video not found');
                } else {
                    console.error('Error deleting video');
                }
            })
            .catch(error => {
                console.error('Error deleting video:', error);
            });
        });
        
    });
}

videoItems.forEach(videoItem => {
    // Encuentra el botón de "like" y el contador en el elemento de video actual
    const likeButton = videoItem.querySelector('.like-button');
    const likeCounter = videoItem.querySelector('.like-counter');
    const username = videoItem.querySelector('.username');
    let isLiked = false;

    likeButton.addEventListener('click', function() {

        if (!isLiked) {
            let currentLikes = parseInt(likeCounter.textContent);

            currentLikes += 1;

            likeCounter.textContent = currentLikes;

            isLiked = true;

            //update like +1
        } else {
            
            let currentLikes = parseInt(likeCounter.textContent);

            currentLikes -= 1;

            likeCounter.textContent = currentLikes;

            isLiked = false;

            //update like -1
        }
    });
});
