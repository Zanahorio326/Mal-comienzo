document.addEventListener("DOMContentLoaded", function () {
    const chatRef = firebase.database().ref("chat");

    chatRef.on("child_added", function (snapshot) {
        const data = snapshot.val();
        if (data.texto === "/hola") {
            chatRef.push({
                usuario: "Narrador",
                texto: "Bienvenido",
                timestamp: Date.now()
            });
        }
    });
});