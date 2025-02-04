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
export function createPlayerBullet(x, y, isBig = false, isFollowing = false) {
    playerBullets.push({ x, y, isBig, isFollowing });
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
            const closestEnemy = findClosestEnemy(bullet, enemies);
            if (closestEnemy) {
                if (bullet.x < closestEnemy.x + closestEnemy.width / 2) bullet.x += 1;
                if (bullet.x > closestEnemy.x + closestEnemy.width / 2) bullet.x -= 1;
            }
            bullet.y -= 1;
        } else {
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
        } else if (bullet.isFollowing) {
            ctx.fillStyle = 'red'; // Bala perseguidora (roja)
        } else {
            ctx.fillStyle = 'orange'; // Bala rápida (naranja)
        }
        ctx.fillRect(bullet.x, bullet.y, bullet.isBig ? 15 : 5, bullet.isBig ? 30 : 10);
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
                playerBullets.splice(i, 1);
                onEnemyHit(j); // Llamar a la función de colisión con el enemigo
                return;
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
}