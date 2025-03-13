document.addEventListener("DOMContentLoaded", function () {
    const chatRef = firebase.database().ref("chat");

    // Función para reconectar
    function reconnectChat() {
        const newChatRef = firebase.database().ref("chat");
        newChatRef.on("child_added", function (snapshot) {
            const data = snapshot.val();
            if (data.texto === "/hola") {
                newChatRef.push({
                    usuario: "Narrador",
                    texto: "Bienvenido",
                    timestamp: Date.now()
                });
            }
        });
    }

    // Conectar inicialmente
    reconnectChat();

    // Reconectar cada vez que se envíe un mensaje
    chatRef.on("child_added", function () {
        reconnectChat();
    });
});