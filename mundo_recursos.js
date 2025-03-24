// Variable global para gestionar el temporizador de la visualización del Acha
let axeDisplayStart = undefined;

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
    // Dibujar brazos y piernas
    line(-10, 5, -20, 15 + angle);
    line(10, 5, 20, 15 - angle);
    line(-5, 30, -5, 50 + angle);
    line(5, 30, 5, 50 - angle);
    // Calcular puntos finales de las manos
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
      // Calcular posición final de la mano en coordenadas locales
      leftHand = p5.Vector.add(createVector(-10, 5), p5.Vector.fromAngle(3 * PI / 4 + swing).mult(armLength));
    pop();
    
    // Brazo derecho: pivote en (10,5), ángulo base PI/4 (45°) - swing
    push();
      translate(10, 5);
      rotate(PI / 4 - swing);
      line(0, 0, armLength, 0);
      rightHand = p5.Vector.add(createVector(10, 5), p5.Vector.fromAngle(PI / 4 - swing).mult(armLength));
    pop();
    
    // Dibujar piernas (se mantiene la animación sin uso para el Acha)
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
  // Se usa un umbral similar al usado en el código principal (50)
  let threshold = 50;
  let chopping = false;
  let nearestTree = null;
  let nearestTreeDist = Infinity;
  // Recorrer el arreglo global de árboles; se usa (t.y + 30) como centro, según el código principal
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
  
  // Gestionar el temporizador para mostrar el Acha durante 3 segundos
  if (chopping) {
    if (axeDisplayStart === undefined) {
      axeDisplayStart = millis();
    }
  } else {
    axeDisplayStart = undefined;
  }
  
  if (axeDisplayStart !== undefined && millis() - axeDisplayStart < 3000) {
    // Calcular la posición del árbol en coordenadas locales (relativa al usuario)
    let treeLocal = createVector(nearestTree.x - user.x, (nearestTree.y + 30) - user.y);
    // Comparar distancias desde el árbol a cada mano
    let dLeft = p5.Vector.dist(leftHand, treeLocal);
    let dRight = p5.Vector.dist(rightHand, treeLocal);
    let axePos;
    if (dLeft < dRight) {
      axePos = leftHand;
    } else {
      axePos = rightHand;
    }
    // Dibujar el emoji de Acha sobre la mano seleccionada
    push();
      textAlign(CENTER, CENTER);
      textSize(16);
      text("🪓", axePos.x, axePos.y);
    pop();
  }
}