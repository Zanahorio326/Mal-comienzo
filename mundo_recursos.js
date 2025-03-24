function animateLimbs(isMoving) {
  // Detectar si el movimiento es mayormente horizontal usando las variables globales del joystick
  let sideView = false;
  let dx = 0, dy = 0;
  if (typeof joystickCenter !== 'undefined' && typeof joystickPos !== 'undefined') {
    dx = joystickPos.x - joystickCenter.x;
    dy = joystickPos.y - joystickCenter.y;
    if (abs(dx) > abs(dy)) {
      sideView = true;
    }
  }

  if (!sideView) {
    // Animación original: brazos y piernas oscilan verticalmente (pendular)
    let angle = isMoving ? sin(frameCount * 0.2) * 10 : 0;
    line(-10, 5, -20, 15 + angle);
    line(10, 5, 20, 15 - angle);
    line(-5, 30, -5, 50 + angle);
    line(5, 30, 5, 50 - angle);
  } else {
    // Animación en vista de perfil: ambos brazos y piernas en su extensión máxima
    // oscilan de lado a lado.
    let armLength = 20;
    let legLength = 20;
    // Se usan fases opuestas para cada lado: el brazo izquierdo y la pierna izquierda se mueven en fase
    // mientras que el derecho se mueve en contrafase.
    let leftArmOsc = isMoving ? sin(frameCount * 0.2) * 5 : 0;
    let rightArmOsc = isMoving ? -sin(frameCount * 0.2) * 5 : 0;
    let leftLegOsc = isMoving ? sin(frameCount * 0.2) * 5 : 0;
    let rightLegOsc = isMoving ? -sin(frameCount * 0.2) * 5 : 0;
    // Dibujar brazos: se parte de los hombros (asumidos en (-10,5) para la izquierda y (10,5) para la derecha)
    line(-10, 5, -10 - armLength + leftArmOsc, 5);
    line(10, 5, 10 + armLength + rightArmOsc, 5);
    // Dibujar piernas: se parte de la cadera (asumida en (-5,30) para la izquierda y (5,30) para la derecha)
    line(-5, 30, -5 - legLength + leftLegOsc, 30);
    line(5, 30, 5 + legLength + rightLegOsc, 30);
  }
}