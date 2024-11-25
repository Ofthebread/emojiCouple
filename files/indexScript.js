// Obtener el elemento de audio
const hoverSound = document.querySelector('#hover-sound');

// Función para reproducir el sonido al pasar el cursor sobre los botones
document.querySelectorAll('.nav-button').forEach((button) => {
    button.addEventListener('mouseover', () => {
        hoverSound.play(); // Reproducir el sonido
    });
});
