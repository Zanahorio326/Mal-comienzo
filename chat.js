import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBRCo_R7EOod4IE67GlSLNrO3WEOOVMLrQ",
    authDomain: "thegame-5afaa.firebaseapp.com",
    databaseURL: "https://thegame-5afaa-default-rtdb.firebaseio.com",
    projectId: "thegame-5afaa",
    storageBucket: "thegame-5afaa.appspot.com",
    messagingSenderId: "588556182984",
    appId: "1:588556182984:web:a0557067d35c18e3944cfd",
    measurementId: "G-9M3CBJ3LV9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, 'chat');

// Obtener el nombre de usuario desde el almacenamiento local
const username = localStorage.getItem("username") || "Desconocido";

// Esperar a que el DOM esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el contenedor de herramientas
    const herramientas = document.getElementById("herramientas");

    // Crear el botón "Minar"
    const btnMinar = document.createElement("button");
    btnMinar.textContent = "⛏️ Minar";
    btnMinar.style.display = "block";
    btnMinar.style.width = "100%";
    btnMinar.style.padding = "10px";
    btnMinar.style.marginTop = "10px";
    btnMinar.style.border = "none";
    btnMinar.style.borderRadius = "5px";
    btnMinar.style.backgroundColor = "#ffcc00";
    btnMinar.style.cursor = "pointer";
    btnMinar.style.fontSize = "16px";

    // Agregar el botón al contenedor de herramientas
    herramientas.appendChild(btnMinar);

    // Evento para enviar un mensaje al chat cuando se presiona "Minar"
    btnMinar.addEventListener("click", function () {
        push(chatRef, {
            usuario: username,
            texto: "⛏️ está minando...",
            timestamp: Date.now()
        });
    });
});