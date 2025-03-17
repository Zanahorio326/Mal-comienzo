// Se agrega un nuevo botón en el HTML con el id "btnEspada"
// Este código sigue el mismo flujo que el crafteo del cuchillo, pero para fabricar una "espada"

document.getElementById("btnEspada").addEventListener("click", function() {
    // Deshabilitar todos los botones para evitar acciones simultáneas
    document.getElementById("btn1").disabled = true;
    document.getElementById("btn2").disabled = true;
    document.getElementById("btnMinar").disabled = true;
    document.getElementById("btnTalar").disabled = true;
    document.getElementById("btnPoder").disabled = true;
    document.getElementById("btnEspada").disabled = true; // Nuevo botón

    // Mensaje inicial en el chat indicando los materiales requeridos para craftear la espada
    push(ref(db, 'chat'), {
        usuario: username,
        texto: "Para hacer una espada necesito 5 de carbón 🪨 para fundir el metal, 4 de hierro ⚙️ para la hoja y 1 de madera 🪵 para el mango ó_ò", // Mensaje 1
        timestamp: Date.now()
    });

    setTimeout(function() {
        // Verificación de recursos
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const inventory = snapshot.val().inventory || {
                    carbón: 0,
                    cobre: 0,
                    hierro: 0,
                    plata: 0,
                    oro: 0,
                    madera: 0
                };

                if (inventory.carbón >= 5 && inventory.hierro >= 4 && inventory.madera >= 1) {
                    // Si hay materiales suficientes
                    push(ref(db, 'chat'), {
                        usuario: username,
                        texto: "^_^ Tengo esos materiales, encenderé la forja... 🔥", // Mensaje 2
                        timestamp: Date.now()
                    });

                    setTimeout(function() {
                        push(ref(db, 'chat'), {
                            usuario: username,
                            texto: " `~` 🪨 Usaré el carbón para derretir el metal...", // Mensaje 3
                            timestamp: Date.now()
                        });

                        // Se descuentan los materiales del inventario
                        inventory.carbón -= 5;
                        inventory.hierro -= 4;
                        inventory.madera -= 1;

                        update(userRef, { inventory });

                        setTimeout(function() {
                            push(ref(db, 'chat'), {
                                usuario: username,
                                texto: "(/◕ヮ◕)/ 🪵 Tallando el mango con la madera...", // Mensaje 4
                                timestamp: Date.now()
                            });

                            setTimeout(function() {
                                setTimeout(function() {
                                    push(ref(db, 'chat'), {
                                        usuario: username,
                                        texto: "¡Listo! ⚔️ヽ(^o^)丿", // Mensaje 5
                                        timestamp: Date.now()
                                    });

                                    inventory.espada = (inventory.espada || 0) + 1;
                                    update(userRef, { inventory });

                                    // Re-habilitar los botones
                                    document.getElementById("btn1").disabled = false;
                                    document.getElementById("btn2").disabled = false;
                                    document.getElementById("btnMinar").disabled = false;
                                    document.getElementById("btnTalar").disabled = false;
                                    document.getElementById("btnPoder").disabled = false;
                                    document.getElementById("btnEspada").disabled = false;
                                }, 10000);
                            }, 10000);
                        }, 10000);
                    }, 10000);
                } else {
                    // Si no hay suficientes materiales
                    push(ref(db, 'chat'), {
                        usuario: username,
                        texto: "mensaje 3", // Mensaje indicando falta de recursos
                        timestamp: Date.now()
                    });

                    setTimeout(function() {
                        // Re-habilitar los botones
                        document.getElementById("btn1").disabled = false;
                        document.getElementById("btn2").disabled = false;
                        document.getElementById("btnMinar").disabled = false;
                        document.getElementById("btnTalar").disabled = false;
                        document.getElementById("btnPoder").disabled = false;
                        document.getElementById("btnEspada").disabled = false;
                    }, 1000);
                }
            }
        }).catch((error) => console.error("Error al obtener los recursos: ", error));
    }, 1000);
});