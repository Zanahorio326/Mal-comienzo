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
    // Las extremidades parten de su posición por defecto:
    // - Brazo izquierdo: desde (-10,5) con dirección 135° (3*PI/4) [simula (-20,15)]
    // - Brazo derecho: desde (10,5) con dirección 45° (PI/4) [simula (20,15)]
    // - Piernas: ambas desde (-5,30) y (5,30) en dirección vertical (90° o PI/2)
    // Luego se les aplica una rotación pendular para oscilar de adelante hacia atrás.
    let maxSwing = 0.35; // en radianes (aprox 20°)
    let swing = isMoving ? sin(frameCount * 0.2) * maxSwing : 0;
    let armLength = 14; // longitud aproximada desde hombro hasta mano
    let legLength = 20; // longitud aproximada desde cadera hasta pie
    
    // Brazo izquierdo
    push();
      translate(-10, 5);
      // Ángulo base 3*PI/4 (135°) y se suma swing
      rotate(3 * PI / 4 + swing);
      // Dibujar línea de longitud fija
      line(0, 0, armLength, 0);
    pop();
    
    // Brazo derecho
    push();
      translate(10, 5);
      // Ángulo base PI/4 (45°) y se resta swing
      rotate(PI / 4 - swing);
      line(0, 0, armLength, 0);
    pop();
    
    // Pierna izquierda
    push();
      translate(-5, 30);
      // Ángulo base PI/2 (90°) y se suma swing
      rotate(PI / 2 + swing);
      line(0, 0, legLength, 0);
    pop();
    
    // Pierna derecha
    push();
      translate(5, 30);
      // Ángulo base PI/2 (90°) y se resta swing
      rotate(PI / 2 - swing);
      line(0, 0, legLength, 0);
    pop();
  }
}