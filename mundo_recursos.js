function animateLimbs(isMoving) {
  let horizontal = false;
  if (typeof joystickCenter !== 'undefined' && typeof joystickPos !== 'undefined') {
    let dx = joystickPos.x - joystickCenter.x;
    let dy = joystickPos.y - joystickCenter.y;
    if (abs(dx) > abs(dy)) {
      horizontal = true;
    }
  }

  // Rebote de la cabeza
  let headBounce = isMoving ? sin(frameCount * 0.2) * 2 : 0;

  // Dibujar cabeza con rebote
  ellipse(0, -10 + headBounce, 20, 20);

  if (!horizontal) {
    let angle = isMoving ? sin(frameCount * 0.2) * 10 : 0;
    line(-10, 5, -20, 15 + angle);
    line(10, 5, 20, 15 - angle);
    line(-5, 30, -5, 50 + angle);
    line(5, 30, 5, 50 - angle);
  } else {
    let maxSwing = 0.35;
    let swing = isMoving ? sin(frameCount * 0.2) * maxSwing : 0;
    let armLength = 14;
    let legLength = 20;

    push();
      translate(-10, 5);
      rotate(3 * PI / 4 + swing);
      line(0, 0, armLength, 0);
    pop();

    push();
      translate(10, 5);
      rotate(PI / 4 - swing);
      line(0, 0, armLength, 0);
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
}