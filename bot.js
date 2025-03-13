// Bot básico para responder al comando /hola

// Referencia a la base de datos de Firebase
const chatRef = firebase.database().ref('chat');

// Escuchar los eventos de mensaje en el chat
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnEnviar").addEventListener("click", function() {
        const mensaje = document.getElementById("inputMensaje").value.trim();
        
        // Verificar si el mensaje contiene el comando /hola
        if (mensaje === "/hola") {
            // Responder con "Bienvenido"
            const respuesta = "Narrador: Bienvenido";
            // Enviar la respuesta al chat
            push(chatRef, {
                usuario: "Bot",
                texto: respuesta,
                timestamp: Date.now()
            });
        } else if (mensaje !== "") {
            // Enviar el mensaje original del usuario al chat
            push(chatRef, {
                usuario: "Usuario",
                texto: mensaje,
                timestamp: Date.now()
            });
        }

        // Limpiar el input de texto después de enviar
        document.getElementById("inputMensaje").value = "";
    });
});