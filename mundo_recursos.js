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
    // Animación para movimiento horizontal: brazos y piernas "extendidos" y rotados pendularmente
    // Usamos un ángulo máximo de swing de aproximadamente 20° (0.35 radianes)
    let maxSwing = 0.35;
    let swing = isMoving ? sin(frameCount * 0.2) * maxSwing : 0;
    
    // Dibujar brazo izquierdo: pivote en (-10,5) y se extiende a la izquierda
    push();
    translate(-10, 5);
    rotate(swing);
    // Dibujar línea horizontal a la izquierda (longitud fija, p.ej. 10 píxeles)
    line(0, 0, -10, 0);
    pop();
    
    // Dibujar brazo derecho: pivote en (10,5) y se extiende a la derecha
    push();
    translate(10, 5);
    rotate(-swing);
    line(0, 0, 10, 0);
    pop();
    
    // Dibujar pierna izquierda: pivote en (-5,30) y se extiende hacia atrás
    push();
    translate(-5, 30);
    rotate(swing);
    // Longitud fija (20 píxeles) para la pierna
    line(0, 0, -20, 0);
    pop();
    
    // Dibujar pierna derecha: pivote en (5,30) y se extiende hacia atrás
    push();
    translate(5, 30);
    rotate(-swing);
    line(0, 0, 20, 0);
    pop();
  }
}