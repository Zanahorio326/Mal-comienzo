// Función para procesar mensajes del usuario
function procesarMensaje(mensaje) {
    const comando = mensaje.trim().toLowerCase();
    
    if (comando === "/hola") {
        return "¡Hola, ¿cómo estás?";
    }
    // Respuesta por defecto para otros mensajes
    return "Comando no reconocido.";
}

// Agregar evento al recibir un mensaje
document.addEventListener("DOMContentLoaded", () => {
    // Aquí puedes agregar código para escuchar el chat o procesar un evento de ingreso de mensaje
    document.getElementById("btnEnviar").addEventListener("click", function() {
        const mensaje = document.getElementById("inputMensaje").value.trim();
        if (mensaje !== "") {
            const respuesta = procesarMensaje(mensaje);
            // Mostrar la respuesta del bot en el chat
            const mensajeElemento = document.createElement("div");
            mensajeElemento.textContent = `Bot: ${respuesta}`;
            mensajeElemento.classList.add("mensaje");
            document.getElementById("mensajes").appendChild(mensajeElemento);
            document.getElementById("inputMensaje").value = "";
        }
    });
});