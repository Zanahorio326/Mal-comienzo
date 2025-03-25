// Variable global para gestionar el temporizador de la visualización del Acha
let axeDisplayStart = undefined;

function animateLimbs(isMoving) {
  let horizontal = false;
  if (typeof joystickCenter !== 'undefined' && typeof joystickPos !== 'undefined') {
    let dx = joystickPos.x - joystickCenter.x;
    let dy = joystickPos.y - joystickCenter.y;
    if (abs(dx) > abs(dy)) {
      horizontal = true;
    }
  }

  let leftHand, rightHand;

  if (!horizontal) {
    let angle = isMoving ? sin(frameCount * 0.2) * 10 : 0;
    line(-10, 5, -20, 15 + angle);
    line(10, 5, 20, 15 - angle);
    line(-5, 30, -5, 50 + angle);
    line(5, 30, 5, 50 - angle);
    leftHand = createVector(-20, 15 + angle);
    rightHand = createVector(20, 15 - angle);
  } else {
    let maxSwing = 0.35;
    let swing = isMoving ? sin(frameCount * 0.2) * maxSwing : 0;
    let armLength = 14;
    let legLength = 20;

    push();
      translate(-10, 5);
      rotate(3 * PI / 4 + swing);
      line(0, 0, armLength, 0);
      leftHand = p5.Vector.add(createVector(-10, 5), p5.Vector.fromAngle(3 * PI / 4 + swing).mult(armLength));
    pop();

    push();
      translate(10, 5);
      rotate(PI / 4 - swing);
      line(0, 0, armLength, 0);
      rightHand = p5.Vector.add(createVector(10, 5), p5.Vector.fromAngle(PI / 4 - swing).mult(armLength));
    pop();

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
    let axePos;
    if (dLeft < dRight) {
      axePos = leftHand;
    } else {
      axePos = rightHand;
    }

    push();
      textAlign(RIGHT, BOTTOM);
      textSize(20);
      // Ajuste fino: el emoji ahora se dibuja ligeramente más arriba y a la izquierda de la esquina inferior derecha
      text("🪓", axePos.x - 3, axePos.y - 3);
    pop();
  }
}