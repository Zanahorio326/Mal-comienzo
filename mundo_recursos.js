function animateLimbs(isMoving) {
  let angle = isMoving ? sin(frameCount * 0.2) * 10 : 0;
  line(-10, 5, -20, 15 + angle);
  line(10, 5, 20, 15 - angle);
  line(-5, 30, -5, 50 + angle);
  line(5, 30, 5, 50 - angle);
}