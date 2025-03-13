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

    // Observar el campo de entrada de mensajes para responder a los comandos
    const inputMensaje = document.getElementById("inputMensaje");

    // Escuchar cuando el usuario haga click en "Enviar" o presione la tecla "Enter"
    document.getElementById("btnEnviar").addEventListener("click", function() {
        const mensaje = inputMensaje.value.trim();

        // Comando /hola
        if (mensaje === "/hola") {
            enviarMensaje("¡Hola! ¿En qué puedo ayudarte?");
        }
        // Comando /help
        else if (mensaje === "/help") {
            enviarMensaje("Te ayudaré aventurero, lista de comandos:\n/help\n/hola");
        }
        
        // Limpiar el campo de entrada después de enviar el mensaje
        inputMensaje.value = "";
    });

    // Detectar tecla "Enter" para enviar mensajes
    inputMensaje.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            const mensaje = inputMensaje.value.trim();

            // Comando /hola
            if (mensaje === "/hola") {
                enviarMensaje("¡Hola! ¿En qué puedo ayudarte?");
            }
            // Comando /help
            else if (mensaje === "/help") {
                enviarMensaje("Te ayudaré aventurero, lista de comandos:\n/help\n/hola");
            }
            
            // Limpiar el campo de entrada después de enviar el mensaje
            inputMensaje.value = "";
        }
    });
});