(function() {
    // Definir nombre del bot
    const botName = "Bot";
    const chatRef = ref(db, 'chat'); // Aquí debes definir tu referencia a la base de datos de Firebase

    // Crear y añadir estilo para los mensajes del bot
    const style = document.createElement("style");
    style.innerHTML = `
        .botMessage {
            background: rgba(255, 255, 255, 0.4);
            color: #ffcc00;
            padding: 8px;
            margin: 5px;
            border-radius: 5px;
            width: fit-content;
        }
    `;
    document.head.appendChild(style);

    // Función para manejar los mensajes de la base de datos
    onChildAdded(chatRef, (snapshot) => {
        const data = snapshot.val();
        
        // Responder al comando /hola
        if (data.texto === "/hola") {
            const respuesta = "Bot: bienvenido";

            // Crear un nuevo div para mostrar la respuesta del bot
            const mensajeElemento = document.createElement("div");
            mensajeElemento.textContent = respuesta;
            mensajeElemento.classList.add("botMessage");

            // Agregar el mensaje al chat
            document.getElementById("mensajes").appendChild(mensajeElemento);

            // Mantener solo los últimos 6 mensajes en el chat
            const mensajes = document.getElementById("mensajes").children;
            if (mensajes.length > 6) {
                document.getElementById("mensajes").removeChild(mensajes[0]);
            }
        }
    });

})();