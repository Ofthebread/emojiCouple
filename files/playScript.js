'use strict'; // Establece el modo estricto para evitar errores comunes y malas prácticas

// Array base de los emojis que se mostrarán en las cartas
const arrayEmojis = ['🏰', '🧙‍♂️', '🪄', '🦁', '⚗️', '🐍', '🧹', '⚡'];

// Elementos del DOM que vamos a manipular
const cardsContainer = document.querySelector('.cards-container'); // Contenedor de las cartas
const attemptsDisplay = document.querySelector('.attempts'); // Muestra los intentos
const timerDisplay = document.querySelector('.timer'); // Muestra el tiempo
const winning = document.querySelector('.winning'); // Mensaje de victoria
const startButton = document.querySelector('.startButton'); // Botón de inicio
const difficultyHTML = document.querySelector('.difficulty'); // Sección de dificultad
const losingScreen = document.querySelector('.losing'); // Pantalla de derrota
const mainContainer = document.querySelector('.mainContainer'); // Contenedor principal del juego
const information = document.querySelector('.information'); // Información adicional
const cardsSection = document.querySelector('.cards'); // Sección de cartas
const main = document.querySelector('main'); // Elemento principal
const h1 = document.querySelector('h1'); // Título principal
const footerButton = document.querySelector('.footerButton'); // Botón del footer

let matchedPairs = 0; // Contador de parejas encontradas
let flippedCards = []; // Array de cartas volteadas
let attempts = 0; // Contador de intentos
let timerInterface = null; // Variable para controlar el temporizador

// Crear un array con dos copias de los emojis para formar parejas
let arrayEmojisFinal = [...arrayEmojis, ...arrayEmojis];

// Función para barajar el array de emojis (Método Fisher-Yates)
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Intercambia los elementos
    }
};

// Función que inicia el juego, mostrando los botones de dificultad
function startGame() {
    const ambientSound = document.querySelector('.ambientSound'); // Música ambiental
    ambientSound.play(); // Reproducir música
    mainContainer.classList.add('mainGameStarted'); // Establece las clases CSS
    difficultyHTML.classList.add('difficultyGameStarted');
    footerButton.classList.add('difficultyFooterButton');
    cardsContainer.textContent = ''; // Limpia las cartas previas
    createDifficultyButtons(); // Crea los botones de dificultad
    shuffleArray(arrayEmojisFinal); // Baraja los emojis
    startButton.remove(); // Elimina el botón de inicio
}

// Función para crear los botones de dificultad
function createDifficultyButtons() {
    const easyButton = document.createElement('button'); // Crea el botón de fácil
    const mediumButton = document.createElement('button'); // Crea el botón de medio
    const hardButton = document.createElement('button'); // Crea el botón de difícil
    easyButton.textContent = 'Fácil'; // Texto del botón
    mediumButton.textContent = 'Medio'; // Texto del botón
    hardButton.textContent = 'Difícil'; // Texto del botón
    easyButton.classList.add('buttonDifficulty'); // Añade clase CSS
    mediumButton.classList.add('buttonDifficulty');
    hardButton.classList.add('buttonDifficulty');
    difficultyHTML.textContent = 'Seleccione la dificultad'; // Texto en el contenedor de dificultad
    difficultyHTML.appendChild(easyButton); // Añade los botones al HTML
    difficultyHTML.appendChild(mediumButton);
    difficultyHTML.appendChild(hardButton);
    h1.classList.add('h1Difficulty'); // Cambia el estilo del título
    easyButton.addEventListener('click', () => setDifficulty(90)); // Dificultad fácil
    mediumButton.addEventListener('click', () => setDifficulty(60)); // Dificultad media
    hardButton.addEventListener('click', () => setDifficulty(30)); // Dificultad difícil
}

// Función para crear una carta
function createCard(frontContent, backContent) {
    const cardContainer = document.createElement('div'); // Contenedor de la carta
    cardContainer.classList.add('card-container'); // Añade clase CSS
    const card = document.createElement('div'); // Crea la carta
    card.classList.add('card'); // Añade clase CSS
    const front = document.createElement('div'); // Cara frontal de la carta
    front.classList.add('front');
    front.textContent = frontContent; // Establece el contenido de la carta
    const back = document.createElement('div'); // Cara posterior de la carta
    back.classList.add('back');
    back.textContent = backContent; // Establece el contenido del reverso

    card.appendChild(front); // Añade las caras a la carta
    card.appendChild(back);
    cardContainer.appendChild(card); // Añade la carta al contenedor
    cardsContainer.appendChild(cardContainer); // Añade la carta al contenedor principal

    // Añade el evento de click para girar la carta
    card.addEventListener('click', () => {
        if (
            card.classList.contains('flipped') ||
            card.classList.contains('disabled')
        )
            return;
        card.classList.add('flipped'); // Gira la carta
        flippedCards.push(card); // Añade la carta al array de cartas volteadas

        if (flippedCards.length === 2) {
            // Si se han volteado dos cartas, verifica si coinciden
            checkMatch();
            attempts++; // Incrementa el contador de intentos
            attemptsDisplay.textContent = `Intentos: ${attempts}`; // Muestra los intentos
        }

        // Reproduce sonido cuando se hace clic en una carta
        const audioElement = document.querySelector('.cardHover');
        audioElement.currentTime = 0; // Reinicia el audio
        audioElement.play();
    });
}

// Función que comprueba si las cartas volteadas coinciden
function checkMatch() {
    const [card1, card2] = flippedCards; // Obtiene las dos cartas volteadas
    const back1 = card1.querySelector('.back').textContent; // Contenido de la primera carta
    const back2 = card2.querySelector('.back').textContent; // Contenido de la segunda carta

    if (back1 === back2) {
        // Si las cartas coinciden
        setTimeout(() => {
            const audioElement1 = document.querySelector('.success'); // Sonido de éxito
            audioElement1.currentTime = 0; // Reinicia el audio
            audioElement1.play(); // Reproduce el audio de éxito
        }, 1000);

        matchedPairs++; // Incrementa el contador de parejas encontradas
        flippedCards.forEach((card) => card.classList.add('disabled')); // Desactiva las cartas emparejadas
        flippedCards = []; // Reinicia el array de cartas volteadas
        if (matchedPairs === arrayEmojis.length) {
            // Si se han emparejado todas las cartas
            endGame();
        }
    } else {
        // Si las cartas no coinciden
        setTimeout(() => {
            flippedCards.forEach((card) => card.classList.remove('flipped')); // Restaura el array de cartas
            flippedCards = [];
        }, 1000);
    }
}

// Función que termina el juego cuando todas las cartas están emparejadas
function endGame() {
    clearInterval(timerInterface); // Detiene el temporizador
    //Demora la aparición de la pantalla al ganar

    setTimeout(() => {
        winning.classList.add('winningScreen'); // Muestra la pantalla de victoria
        winning.textContent = `Felicidades! Has ganado en ${attempts} intentos.`; // Muestra el número de intentos

        // Crea el botón para reiniciar el juego
        const resetButton = document.createElement('button');
        resetButton.classList.add('resetButton');
        const resetImage = document.createElement('img');
        resetImage.src = '../images/return40x40.png'; // Imagen para el botón
        resetImage.alt = 'Volver a jugar';
        resetImage.classList.add('resetImage');
        resetButton.appendChild(resetImage); // Añade la imagen al botón
        winning.appendChild(resetButton); // Añade el botón a la pantalla de victoria

        resetButton.addEventListener('click', () => resetGame()); // Reinicia el juego al hacer clic en el botón

        // Reproduce el sonido de victoria
        const winAudio = document.querySelector('.winAudio');
        winAudio.play();
    }, 1000);
}

// Función que reinicia el juego
function resetGame() {
    // Barajar el array antes de reiniciar
    shuffleArray(arrayEmojisFinal);
    clearInterval(timerInterface); // Detiene el temporizador
    timerDisplay.textContent = ''; // Limpia el temporizador
    attemptsDisplay.textContent = ''; // Limpia los intentos
    difficultyHTML.classList.remove('boardDisplay', 'difficultyGameStarted');
    difficultyHTML.classList.add('difficulty');
    mainContainer.classList.remove('mainGameStarted'); // Resetea la clase de inicio
    cardsContainer.textContent = ''; // Limpia las cartas
    matchedPairs = 0; // Reinicia el contador de parejas encontradas
    attempts = 0; // Reinicia los intentos
    winning.classList.remove('winningScreen'); // Quita la pantalla de victoria
    createDifficultyButtons(); // Vuelve a crear los botones de dificultad
    startButton.remove(); // Elimina el botón de inicio
    losingScreen.classList.remove('losingScreen'); // Quita la pantalla de derrota
}

// Configurar dificultad
function setDifficulty(seconds) {
    // Barajar los emojis antes de crear las cartas
    shuffleArray(arrayEmojisFinal);
    // Se elimina la clase 'difficultyGameStarted' y se añade 'boardDisplay' para preparar la interfaz
    difficultyHTML.classList.remove('difficultyGameStarted');
    difficultyHTML.classList.add('boardDisplay');

    // Se añaden clases al contenedor principal para adaptarlo al juego en curso
    mainContainer.classList.add('mainContainerGameStartedBoard');
    main.classList.add('mainGameStartedBoard');
    footerButton.classList.remove('difficultyFooterButton');

    // Inicializamos el temporizador con el valor recibido de dificultad (segundos)
    let timer = seconds;

    // Función para actualizar el contador del temporizador en formato MM:SS
    const updateTimerDisplay = () => {
        const minutos = Math.floor(timer / 60); // Calcula los minutos
        const segundos = timer % 60; // Calcula los segundos restantes
        // Muestra el temporizador en el formato adecuado (00:00)
        timerDisplay.textContent = `Tiempo: ${minutos
            .toString()
            .padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    };

    // Llama la función para mostrar el temporizador en su formato inicial
    updateTimerDisplay();

    // Función que actualiza el temporizador cada segundo
    timerInterface = setInterval(() => {
        timer--; // Decrementa el temporizador en 1 cada segundo
        updateTimerDisplay(); // Actualiza la visualización del temporizador
        if (timer <= 0) {
            // Si el temporizador llega a 0
            clearInterval(timerInterface); // Detiene el temporizador
            showLosingScreen(); // Muestra la pantalla de derrota
        }
    }, 1000);

    // Crear y mostrar las cartas inmediatamente (con los emojis visibles)
    for (const value of arrayEmojisFinal) {
        createCard('', value); // Las cartas tienen inicialmente los emojis visibles
    }

    // Selecciona todas las cartas recién creadas
    const showCards = document.querySelectorAll('.card');

    // Añade la clase 'flipped' a todas las cartas para que aparezcan giradas inicialmente
    showCards.forEach((card) => card.classList.add('flipped'));

    // Después de 2 segundos, voltea las cartas para ocultar los emojis
    setTimeout(() => {
        // Quita la clase 'flipped' para devolver las cartas a su estado oculto
        showCards.forEach((card) => card.classList.remove('flipped'));
        // Obtener el elemento de audio para el sonido del click de la carta
        const audioElement = document.querySelector('.cardHover');

        // Reinicia el audio y lo reproduce
        audioElement.currentTime = 0;
        audioElement.play();
    }, 2000); // Espera 2 segundos antes de voltear las cartas

    // Elimina la clase 'difficulty' para finalizar la configuración de la dificultad
    difficultyHTML.classList.remove('difficulty');
}

// Mostrar pantalla de derrota
function showLosingScreen() {
    // Muestra la pantalla de derrota y cambia el texto
    losingScreen.classList.add('losingScreen');
    losingScreen.textContent = 'Has perdido!';

    // Crea un botón para reiniciar el juego
    const resetButton = document.createElement('button');
    resetButton.classList.add('resetButton'); // Añade clase para estilo

    // Crear una imagen dentro del botón para hacerlo más visual
    const resetImage = document.createElement('img');
    resetImage.src = '../images/return40x40.png'; // Establece la ruta de la imagen
    resetImage.alt = 'Volver a jugar'; // Texto alternativo de la imagen
    resetImage.classList.add('resetImage'); // Añade clase CSS para el estilo

    // Añade la imagen al botón y el botón a la pantalla de derrota
    resetButton.appendChild(resetImage);
    losingScreen.appendChild(resetButton);

    // Añade un evento al botón para reiniciar el juego al hacer clic
    resetButton.addEventListener('click', () => {
        losingScreen.textContent = ''; // Limpia el mensaje de derrota
        resetGame(); // Llama a la función para reiniciar el juego
    });

    // Reproduce el sonido asociado a la pantalla de derrota
    const audioLosing = document.querySelector('.losingAudio');
    audioLosing.play();
}

// Iniciar el juego cuando el botón de inicio es clicado
startButton.addEventListener('click', startGame);

// Verificar el tamaño de la ventana al cambiar el tamaño de la pantalla
window.addEventListener('resize', () => {
    // Si la ventana es más pequeña de 320px, muestra una alerta informativa
    if (window.innerWidth < 320) {
        alert(
            'El tamaño de la ventana es demasiado pequeño para una visualización adecuada.'
        );
    }
});
