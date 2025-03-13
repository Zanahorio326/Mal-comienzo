// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBRCo_R7EOod4IE67GlSLNrO3WEOOVMLrQ",
    authDomain: "thegame-5afaa.firebaseapp.com",
    databaseURL: "https://thegame-5afaa-default-rtdb.firebaseio.com",
    projectId: "thegame-5afaa",
    storageBucket: "thegame-5afaa.firebasestorage.app",
    messagingSenderId: "588556182984",
    appId: "1:588556182984:web:a0557067d35c18e3944cfd",
    measurementId: "G-9M3CBJ3LV9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, 'chat');

// Obtener el nombre del usuario desde el almacenamiento local
const username = localStorage.getItem("username") || "Desconocido";

// Función para enviar mensajes
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnEnviar").addEventListener("click", function() {
        const mensaje = document.getElementById("inputMensaje").value.trim();
        if (mensaje !== "") {
            push(chatRef, {
                usuario: username,
                texto: mensaje,
                timestamp: Date.now()
            });
            document.getElementById("inputMensaje").value = "";
        }
    });
});

// Mostrar mensajes en tiempo real
onChildAdded(chatRef, (snapshot) => {
    const data = snapshot.val();
    const mensajeElemento = document.createElement("div");
    mensajeElemento.textContent = `${data.usuario}: ${data.texto}`;
    mensajeElemento.classList.add("mensaje");
    document.getElementById("mensajes").appendChild(mensajeElemento);

    // Mantener solo los últimos 8 mensajes
    const mensajes = document.getElementById("mensajes").children;
    if (mensajes.length > 8) {
        // Eliminar el mensaje de la pantalla
        document.getElementById("mensajes").removeChild(mensajes[0]);

        // Eliminar el mensaje más antiguo de la base de datos
        const mensajeAEliminar = mensajes[0];
        const mensajeId = mensajeAEliminar.getAttribute('data-id');
        remove(ref(db, 'chat/' + mensajeId));
    }
});