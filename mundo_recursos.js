// mundo_recursos.js

// Función que dibuja la animación de brazos y piernas del personaje al caminar.
// Recibe como parámetro "moving" para saber si se debe animar.
function applyWalkingAnimation(moving) {
  // Calcula el ángulo de animación: si se mueve, se usa una función seno para generar el efecto oscilatorio.
  let angle = moving ? sin(frameCount * 0.2) * 10 : 0;
  // Dibujar brazos
  line(-10, 5, -20, 15 + angle);
  line(10, 5, 20, 15 - angle);
  // Dibujar piernas
  line(-5, 30, -5, 50 + angle);
  line(5, 30, 5, 50 - angle);
}