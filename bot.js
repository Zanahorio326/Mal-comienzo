document.addEventListener("DOMContentLoaded", function () {
    const chatRef = firebase.database().ref("chat");

    // Escuchar los mensajes en tiempo real
    chatRef.on("child_added", function (snapshot) {
        const data = snapshot.val();
        
        // Verificar si el mensaje es el comando "/hola"
        if (data.texto === "/hola") {
            // Responder con el mensaje de bienvenida
            chatRef.push({
                usuario: "Narrador",
                texto: "Bienvenido",
                timestamp: Date.now()
            });
        }
    });
});