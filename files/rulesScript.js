// "use strict";

// document.addEventListener("mousemove", createParticles);

// function createParticles(e) {
//   const particleContainer = document.getElementById("particle-container");

//   for (let i = 0; i < 64; i++) {
//     const particle = document.createElement("div");
//     particle.className = "particle";

//     const sizeClass = ["small", "medium", "large"][
//       Math.floor(Math.random() * 3)
//     ];
//     particle.classList.add(sizeClass);

//     const randomX = Math.random();
//     const randomY = Math.random();

//     particle.style.setProperty("--randomX", randomX);
//     particle.style.setProperty("--randomY", randomY);

//     if (i % 2 === 0) {
//       particle.style.left = `${e.clientX}px`;
//       particle.style.top = `${e.clientY}px`;
//     } else {
//       particle.style.left = `${e.clientX + (Math.random() * 20 - 10)}px`;
//       particle.style.top = `${e.clientY + (Math.random() * 20 - 10)}px`;
//     }

//     particleContainer.appendChild(particle);

//     setTimeout(() => {
//       particle.remove();
//     }, 1500);
//   }
// }
