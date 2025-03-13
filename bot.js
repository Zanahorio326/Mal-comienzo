// bot.js

// Función para enviar el mensaje al chat
function enviarMensaje(mensaje) {
    const chatRef = firebase.database().ref('chat');
    const username = "Bot";  // El nombre del bot

    // Agregar el mensaje al chat
    chatRef.push({
        usuario: username,
        texto: mensaje,
        timestamp: Date.now()
    });
}

// Esperar a que el chat se cargue completamente
document.addEventListener("DOMContentLoaded", function () {
    // Llamar a la función enviarMensaje para mandar un "hola"
    enviarMensaje("hola");

    // Observar el campo de entrada de mensajes para responder al comando /hola
    const inputMensaje = document.getElementById("inputMensaje");

    // Escuchar cuando el usuario presione la tecla "Enter"
    inputMensaje.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const mensaje = inputMensaje.value.trim();

            if (mensaje === "/hola") {
                // Responder al comando /hola
                enviarMensaje("¡Hola! ¿En qué puedo ayudarte?");
                inputMensaje.value = ""; // Limpiar el campo de entrada
            }
        }
    });
});