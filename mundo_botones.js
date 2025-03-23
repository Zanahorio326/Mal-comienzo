document.getElementById("btnMochila").addEventListener("click", function() {
  const inventario = document.getElementById("inventario");
  inventario.classList.toggle("mostrar");
  inventario.innerHTML = `<iframe src="https://zanahorio326.github.io/Mal-comienzo/inventario.html" width="100%" height="400" frameborder="0"></iframe>`;
});

document.getElementById("btnHerramientas").addEventListener("click", function() {
  const herramientas = document.getElementById("herramientas");
  herramientas.classList.toggle("mostrar");
  herramientas.innerHTML = `<iframe src="https://zanahorio326.github.io/Mal-comienzo/teorico.html" width="100%" height="400" frameborder="0"></iframe>`;
});

document.getElementById("btnChat").addEventListener("click", function() {
  const chat = document.getElementById("chat");
  chat.classList.toggle("mostrar");
  // El iframe ahora tiene un alto reducido para no tocar los botones superior e inferior.
  chat.innerHTML = `<iframe src="https://zanahorio326.github.io/Mal-comienzo/chat.html" width="100%" height="calc(500%)" frameborder="0"></iframe>`;
});