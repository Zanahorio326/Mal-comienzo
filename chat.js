document.addEventListener("DOMContentLoaded", function() {
    // Suponiendo que ya tienes el contenedor de herramientas
    const btnMinar = document.createElement("button");
    btnMinar.textContent = "Minar";
    btnMinar.id = "btnMinar";
    document.getElementById("herramientas").appendChild(btnMinar);

    // Evento para el botón "Minar"
    document.getElementById("btnMinar").addEventListener("click", function() {
        // Aquí obtenemos el nombre del usuario, que lo asumimos de alguna manera como 'C'
        const mensaje = "*C pone a minar";
        
        // Enviar el mensaje al chat
        push(chatRef, {
            usuario: "C",  // En este caso, como es una prueba, ponemos un nombre fijo.
            texto: mensaje,
            timestamp: Date.now()
        });
    });
});