document.addEventListener("DOMContentLoaded", function () {
    const chatRef = firebase.database().ref("chat");

    // Alerta cuando el bot se cargue localmente
    alert("Narrador: ¡Bienvenido! El bot se ha cargado correctamente y está listo para interactuar.");

    // Escuchar los mensajes en tiempo real
    chatRef.on("child_added", function (snapshot) {
        const data = snapshot.val();

        // Verificar si el mensaje es el comando "/hola"
        if (data.texto === "/hola") {
            // Responder con el mensaje de bienvenida
            chatRef.push({
                usuario: "Narrador",
                texto: "¡Hola, aventurero! ¿Qué deseas saber hoy?",
                timestamp: Date.now()
            });
        }
        // Otros comandos que el bot puede manejar (agrega más comandos según sea necesario)
        else if (data.texto === "/adios") {
            chatRef.push({
                usuario: "Narrador",
                texto: "Hasta luego, que tengas un gran viaje.",
                timestamp: Date.now()
            });
        }
    });
});