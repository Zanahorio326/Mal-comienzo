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
  
  // Variables para almacenar las posiciones de las manos (en coordenadas locales, con origen en el usuario)
  let leftHand, rightHand;
  
  if (!horizontal) {
    // Animación original: brazos y piernas oscilan verticalmente (pendular)
    let angle = isMoving ? sin(frameCount * 0.2) * 10 : 0;
    line(-10, 5, -20, 15 + angle);
    line(10, 5, 20, 15 - angle);
    line(-5, 30, -5, 50 + angle);
    line(5, 30, 5, 50 - angle);
    leftHand = createVector(-20, 15 + angle);
    rightHand = createVector(20, 15 - angle);
  } else {
    // Animación para movimiento horizontal:
    // Las extremidades parten de su posición por defecto y se les aplica una rotación pendular
    let maxSwing = 0.35; // ~20° en radianes
    let swing = isMoving ? sin(frameCount * 0.2) * maxSwing : 0;
    let armLength = 14; // longitud aproximada desde hombro hasta mano
    let legLength = 20; // longitud aproximada desde cadera hasta pie
    
    // Brazo izquierdo: pivote en (-10,5), ángulo base 3*PI/4 (135°) + swing
    push();
      translate(-10, 5);
      rotate(3 * PI / 4 + swing);
      line(0, 0, armLength, 0);
      leftHand = p5.Vector.add(createVector(-10, 5), p5.Vector.fromAngle(3 * PI / 4 + swing).mult(armLength));
    pop();
    
    // Brazo derecho: pivote en (10,5), ángulo base PI/4 (45°) - swing
    push();
      translate(10, 5);
      rotate(PI / 4 - swing);
      line(0, 0, armLength, 0);
      rightHand = p5.Vector.add(createVector(10, 5), p5.Vector.fromAngle(PI / 4 - swing).mult(armLength));
    pop();
    
    // Dibujar piernas (sin uso para el Acha)
    push();
      translate(-5, 30);
      rotate(PI / 2 + swing);
      line(0, 0, legLength, 0);
    pop();
    
    push();
      translate(5, 30);
      rotate(PI / 2 - swing);
      line(0, 0, legLength, 0);
    pop();
  }
  
  // --- Mostrar Acha en la mano más próxima al árbol más cercano cuando se realiza la acción de talar ---
  let threshold = 50;
  let chopping = false;
  let nearestTree = null;
  let nearestTreeDist = Infinity;
  for (let t of trees) {
    let d = dist(user.x, user.y, t.x, t.y + 30);
    if (d < nearestTreeDist) {
      nearestTreeDist = d;
      nearestTree = t;
    }
  }
  if (nearestTree && nearestTreeDist < threshold) {
    chopping = true;
  }
  
  if (chopping) {
    if (axeDisplayStart === undefined) {
      axeDisplayStart = millis();
    }
  } else {
    axeDisplayStart = undefined;
  }
  
  if (axeDisplayStart !== undefined && millis() - axeDisplayStart < 3000) {
    let treeLocal = createVector(nearestTree.x - user.x, (nearestTree.y + 30) - user.y);
    let dLeft = p5.Vector.dist(leftHand, treeLocal);
    let dRight = p5.Vector.dist(rightHand, treeLocal);
    let handUsed = (dLeft < dRight) ? "left" : "right";
    let axePos = (handUsed === "left") ? leftHand : rightHand;

    push();
      textSize(24);
      if (handUsed === "right") {
        // Efecto espejo completo en la mano derecha: ancla desde la esquina inferior derecha.
        push();
          translate(axePos.x, axePos.y);
          scale(-1, 1);
          textAlign(RIGHT, BOTTOM);
          // Se ajusta el offset a +1 para acercar el mango del acha
          text("🪓", 1, 1);
        pop();
      } else {
        textAlign(RIGHT, BOTTOM);
        // Offset de +1 para acercar el mango en la mano izquierda
        text("🪓", axePos.x + 2, axePos.y + 2);
      }
    pop();
  }
}