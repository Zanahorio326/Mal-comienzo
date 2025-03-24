function animateLimbs(isMoving) {
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
    // Animación en vista de perfil
    let armSwing = sin(frameCount * 0.2) * 10;  // Oscilación pendular del brazo
    let legSwing = cos(frameCount * 0.2) * 10;  // Oscilación alternada de las piernas

    if (dx >= 0) {
      // Movimiento hacia la derecha
      line(10, 5, 20, 5 + armSwing);  // Brazo derecho en frente, oscilando
    } else {
      // Movimiento hacia la izquierda
      line(-10, 5, -20, 5 + armSwing);  // Brazo izquierdo en frente, oscilando
    }

    // Ambas piernas oscilando en oposición (como en una caminata real)
    line(-5, 30, -5, 50 + legSwing);
    line(5, 30, 5, 50 - legSwing);
  }
}