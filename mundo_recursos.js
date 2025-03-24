function animateLimbs(isMoving) {
  // Determinar si el movimiento es lateral utilizando los valores globales del joystick,
  // si están disponibles. Se asume que si la diferencia horizontal es mayor que la vertical,
  // el personaje se mueve hacia un lado.
  let sideView = false;
  let dx = 0;
  if (typeof joystickCenter !== 'undefined' && typeof joystickPos !== 'undefined') {
    dx = joystickPos.x - joystickCenter.x;
    let dy = joystickPos.y - joystickCenter.y;
    if (abs(dx) > abs(dy)) {
      sideView = true;
    }
  }

  let angle = isMoving ? sin(frameCount * 0.2) * 10 : 0;

  if (!sideView) {
    // Animación normal (vista frontal)
    line(-10, 5, -20, 15 + angle);
    line(10, 5, 20, 15 - angle);
    line(-5, 30, -5, 50 + angle);
    line(5, 30, 5, 50 - angle);
  } else {
    // Animación en vista de perfil:
    // Se dibujan solo los miembros del lado que "sale" en primer plano.
    if (dx >= 0) {
      // Movimiento hacia la derecha: se muestran los miembros derechos.
      line(10, 5, 25, 5 + angle);   // Brazo derecho
      line(5, 30, 15, 30 + angle);   // Pierna derecha
    } else {
      // Movimiento hacia la izquierda: se muestran los miembros izquierdos.
      line(-10, 5, -25, 5 - angle);  // Brazo izquierdo
      line(-5, 30, -15, 30 - angle);  // Pierna izquierda
    }
  }
}