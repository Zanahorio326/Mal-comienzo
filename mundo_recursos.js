function animateLimbs(isMoving) {
  // Determinar si el movimiento es mayormente horizontal usando las variables globales del joystick
  let horizontal = false;
  if (typeof joystickCenter !== 'undefined' && typeof joystickPos !== 'undefined') {
    let dx = joystickPos.x - joystickCenter.x;
    let dy = joystickPos.y - joystickCenter.y;
    if (abs(dx) > abs(dy)) {
      horizontal = true;
    }
  }
  
  if (!horizontal) {
    // Animación original: brazos y piernas oscilan verticalmente (pendular)
    let angle = isMoving ? sin(frameCount * 0.2) * 10 : 0;
    line(-10, 5, -20, 15 + angle);
    line(10, 5, 20, 15 - angle);
    line(-5, 30, -5, 50 + angle);
    line(5, 30, 5, 50 - angle);
  } else {
    // Animación para movimiento horizontal:
    // Las extremidades parten de su posición por defecto y se les aplica
    // una rotación pendular (alrededor de sus puntos de pivote) para simular el balanceo de perfil.
    let maxSwing = 0.35; // ángulo máximo en radianes (aprox. 20°)
    let swing = isMoving ? sin(frameCount * 0.2) * maxSwing : 0;
    let armLength = 14; // longitud fija del brazo (desde el hombro)
    let legLength = 20; // longitud fija de la pierna (desde la cadera)
    
    // Brazo izquierdo: pivote en (-10,5) con ángulo base de 135° (3*PI/4)
    push();
      translate(-10, 5);
      rotate(3 * PI / 4 + swing);
      line(0, 0, armLength, 0);
    pop();
    
    // Brazo derecho: pivote en (10,5) con ángulo base de 45° (PI/4)
    push();
      translate(10, 5);
      rotate(PI / 4 - swing);
      line(0, 0, armLength, 0);
    pop();
    
    // Pierna izquierda: pivote en (-5,30) con ángulo base vertical (PI/2)
    push();
      translate(-5, 30);
      rotate(PI / 2 + swing);
      line(0, 0, legLength, 0);
    pop();
    
    // Pierna derecha: pivote en (5,30) con ángulo base vertical (PI/2)
    push();
      translate(5, 30);
      rotate(PI / 2 - swing);
      line(0, 0, legLength, 0);
    pop();
  }
}

// Función auxiliar que retorna el offset vertical para el rebote de la cabeza.
// Úsala en drawHuman para desplazar la cabeza existente en el eje Y.
function getHeadBounce(isMoving) {
  return isMoving ? sin(frameCount * 0.2) * 2 : 0;
}