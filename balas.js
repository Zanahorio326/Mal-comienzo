// balas.js

// Variables relacionadas con las balas
export let playerBullets = [];
export let enemyBullets = [];

// Función para encontrar el enemigo más cercano
function findClosestEnemy(bullet, enemies) {
    let closestEnemy = null;
    let closestDistance = Infinity;
    for (const enemy of enemies) {
        const distance = Math.sqrt(Math.pow(bullet.x - (enemy.x + enemy.width / 2), 2) + Math.pow(bullet.y - (enemy.y + enemy.height / 2), 2));
        if (distance < closestDistance) {
            closestDistance = distance;
            closestEnemy = enemy;
        }
    }
    return closestEnemy;
}

// Función para crear una bala del jugador
export function createPlayerBullet(x, y, isBig = false, isFollowing = false, isPollen = false, isSpores = false, isCrimson = false) {
    playerBullets.push({ x, y, isBig, isFollowing, isPollen, isSpores, isCrimson });
}

// Función para crear una bala de un enemigo
export function createEnemyBullet(x, y, enemyColor) {
    enemyBullets.push({ x, y, color: enemyColor });
}

// Función para actualizar la posición de las balas
export function updateBullets(canvasHeight, enemies) {
    // Actualizar balas del jugador
    playerBullets = playerBullets.filter(bullet => bullet.y > 0);
    for (const bullet of playerBullets) {
        if (bullet.isFollowing) {
            // Lógica de bala perseguidora
            const closestEnemy = findClosestEnemy(bullet, enemies);
            if (closestEnemy) {
                if (bullet.x < closestEnemy.x + closestEnemy.width / 2) bullet.x += 1;
                if (bullet.x > closestEnemy.x + closestEnemy.width / 2) bullet.x -= 1;
            }
            bullet.y -= 1;
        } else if (bullet.isPollen) {
            // Lógica de Carga de Polen (zigzag suave)
            bullet.x += Math.sin(bullet.y * 0.1) * 2; // Movimiento horizontal en zigzag
            bullet.y -= 3; // Movimiento vertical
        } else if (bullet.isSpores) {
            // Lógica de Esporas (balas que se detienen en posiciones aleatorias)
            if (!bullet.finalPosition) {
                bullet.finalX = bullet.x + (Math.random() * 200 - 100); // Posición final aleatoria en X
                bullet.finalY = bullet.y - (Math.random() * 100); // Posición final aleatoria en Y
                bullet.finalPosition = true;
            }
            if (bullet.y > bullet.finalY) {
                bullet.y -= 1; // Movimiento lento hacia la posición final en Y
            }
            if (bullet.x < bullet.finalX) {
                bullet.x += 1; // Movimiento lento hacia la posición final en X
            } else if (bullet.x > bullet.finalX) {
                bullet.x -= 1; // Movimiento lento hacia la posición final en X
            }
        } else if (bullet.isCrimson) {
            // Lógica de Tinte Carmesí (bala rápida y larga)
            bullet.y -= 8; // Movimiento rápido
        } else {
            // Lógica de balas normales
            bullet.y -= bullet.isBig ? 2 : 5;
        }
    }

    // Actualizar balas de los enemigos
    enemyBullets = enemyBullets.filter(bullet => bullet.y < canvasHeight);
    for (const bullet of enemyBullets) {
        bullet.y += bullet.color === 'blue' ? 4 : 2;
    }
}

// Función para dibujar las balas
export function drawBullets(ctx) {
    // Dibujar balas del jugador
    for (const bullet of playerBullets) {
        if (bullet.isBig) {
            ctx.fillStyle = 'blue'; // Bala grande (azul)
            ctx.fillRect(bullet.x, bullet.y, 15, 30); // Tamaño grande
        } else if (bullet.isFollowing) {
            ctx.fillStyle = 'red'; // Bala perseguidora (roja)
            ctx.fillRect(bullet.x, bullet.y, 5, 10); // Tamaño normal
        } else if (bullet.isPollen) {
            ctx.fillStyle = 'yellow'; // Carga de Polen (amarilla)
            ctx.fillRect(bullet.x, bullet.y, 8, 8); // Tamaño ligeramente más grande
        } else if (bullet.isSpores) {
            ctx.fillStyle = 'lightblue'; // Esporas (azul claro)
            ctx.fillRect(bullet.x, bullet.y, 5, 5); // Tamaño pequeño
        } else if (bullet.isCrimson) {
            ctx.fillStyle = 'darkred'; // Tinte Carmesí (rojo oscuro)
            ctx.fillRect(bullet.x, bullet.y, 6, 60); // Tamaño: 6 de ancho y 60 de largo
        } else {
            ctx.fillStyle = 'orange'; // Bala rápida (naranja)
            ctx.fillRect(bullet.x, bullet.y, 5, 10); // Tamaño normal
        }
    }

    // Dibujar balas de los enemigos
    for (const bullet of enemyBullets) {
        ctx.fillStyle = bullet.color === 'blue' ? 'lightblue' : 'orange';
        ctx.fillRect(bullet.x, bullet.y, bullet.color === 'blue' ? 10 : 5, 10);
    }
}

// Función para detectar colisiones entre balas y enemigos/jugador
export function detectCollisions(player, enemies, onEnemyHit, onPlayerHit) {
    // Colisiones de balas del jugador con enemigos
    for (let i = 0; i < playerBullets.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (playerBullets[i].x < enemies[j].x + enemies[j].width &&
                playerBullets[i].x + (playerBullets[i].isBig ? 15 : 5) > enemies[j].x &&
                playerBullets[i].y < enemies[j].y + enemies[j].height &&
                playerBullets[i].y + (playerBullets[i].isBig ? 30 : 10) > enemies[j].y) {
                if (!playerBullets[i].isSpores) { // Las esporas no dañan a los enemigos
                    playerBullets.splice(i, 1);
                    onEnemyHit(j); // Llamar a la función de colisión con el enemigo
                    return;
                }
            }
        }
    }

    // Colisiones de balas de enemigos con el jugador
    for (let i = 0; i < enemyBullets.length; i++) {
        if (enemyBullets[i].x < player.x + player.width &&
            enemyBullets[i].x + (enemyBullets[i].color === 'blue' ? 10 : 5) > player.x &&
            enemyBullets[i].y < player.y + player.height &&
            enemyBullets[i].y + 10 > player.y) {
            enemyBullets.splice(i, 1);
            onPlayerHit(); // Llamar a la función de colisión con el jugador
            return;
        }
    }

    // Colisiones de esporas con balas enemigas
    for (let i = 0; i < playerBullets.length; i++) {
        if (playerBullets[i].isSpores) {
            for (let j = 0; j < enemyBullets.length; j++) {
                if (playerBullets[i].x < enemyBullets[j].x + 5 &&
                    playerBullets[i].x + 5 > enemyBullets[j].x &&
                    playerBullets[i].y < enemyBullets[j].y + 10 &&
                    playerBullets[i].y + 5 > enemyBullets[j].y) {
                    playerBullets.splice(i, 1);
                    enemyBullets.splice(j, 1);
                    return;
                }
            }
        }
    }
}