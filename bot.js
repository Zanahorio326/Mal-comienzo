// Espera que el DOM se cargue completamente antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    // Alerta de carga del bot (Narrador)
    alert("Narrador: ¡Hola, viajero! El bot se ha cargado y está listo para interactuar.");

    // Lógica adicional para manejar el funcionamiento del bot
    // Asegurarse de que el bot funcione localmente si es necesario
    const chatContainer = document.getElementById("mensajes");

    // Función para mostrar un mensaje del bot
    function mostrarMensajeDelBot(mensaje) {
        const mensajeElemento = document.createElement("div");
        mensajeElemento.textContent = `Bot: ${mensaje}`;
        mensajeElemento.classList.add("mensaje");
        chatContainer.appendChild(mensajeElemento);

        // Mantener solo los últimos 6 mensajes
        const mensajes = chatContainer.children;
        if (mensajes.length > 6) {
            chatContainer.removeChild(mensajes[0]);
        }
    }

    // Ejemplo de responder al mensaje del usuario
    function responderMensajeDelUsuario(mensaje) {
        // Aquí el bot podría hacer algo con el mensaje del usuario
        // Por ejemplo, simplemente responder con una respuesta predeterminada
        mostrarMensajeDelBot("¡Gracias por tu mensaje! Estoy aprendiendo a interactuar.");
    }

    // Función para escuchar los mensajes de los usuarios y generar respuestas
    document.getElementById("btnEnviar").addEventListener("click", function () {
        const mensajeUsuario = document.getElementById("inputMensaje").value.trim();
        if (mensajeUsuario !== "") {
            // Mostrar el mensaje del usuario en el chat
            const mensajeElemento = document.createElement("div");
            mensajeElemento.textContent = `Tú: ${mensajeUsuario}`;
            mensajeElemento.classList.add("mensaje");
            chatContainer.appendChild(mensajeElemento);

            // Responder automáticamente después de que el usuario envíe el mensaje
            responderMensajeDelUsuario(mensajeUsuario);

            // Limpiar el campo de entrada
            document.getElementById("inputMensaje").value = "";
        }
    });
});