// Inicialización de Firebase (esto ya debe estar configurado en tu HTML)
const chatRef = firebase.database().ref('chat');

// Función que maneja el envío del mensaje
function enviarMensaje(event) {
    // Prevenir el comportamiento predeterminado si se presiona "Enter"
    if (event && event.key === "Enter") {
        event.preventDefault();
    }

    const mensaje = document.getElementById("inputMensaje").value.trim();
    
    if (mensaje !== "") {
        // Enviar mensaje del usuario
        chatRef.push({
            usuario: "Usuario",
            texto: mensaje,
            timestamp: Date.now()
        });

        // Limpiar el campo de entrada después de enviar el mensaje
        document.getElementById("inputMensaje").value = "";
    }
}

// Detectar cuando se haga clic en el botón "Enviar"
document.addEventListener("DOMContentLoaded", function() {
    // Evento de clic en el botón
    document.getElementById("btnEnviar").addEventListener("click", function(event) {
        enviarMensaje(event);
    });

    // Detectar cuando se presione "Enter" en el campo de mensaje
    document.getElementById("inputMensaje").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            enviarMensaje(event);
        }
    });
});

// Escuchar los mensajes en el chat y mostrarlos en la interfaz
chatRef.on('child_added', function(snapshot) {
    const data = snapshot.val();
    const mensajeElemento = document.createElement("div");
    mensajeElemento.textContent = `${data.usuario}: ${data.texto}`;
    mensajeElemento.classList.add("mensaje");
    document.getElementById("mensajes").appendChild(mensajeElemento);

    // Mantener solo los últimos 6 mensajes visibles
    const mensajes = document.getElementById("mensajes").children;
    if (mensajes.length > 6) {
        document.getElementById("mensajes").removeChild(mensajes[0]);
    }

    // Analizar el último mensaje
    const lastMessage = data.texto;
    if (lastMessage === "/hola") {
        // Si el último mensaje es "/hola", el bot responde con "Narrador: Bienvenido"
        chatRef.push({
            usuario: "Bot",
            texto: "Narrador: Bienvenido",
            timestamp: Date.now()
        });
    }
});