// vida.js
export class BarraDeVida {
    constructor(vidasIniciales = 5) {
        this.vidas = vidasIniciales;
        this.maxVidas = vidasIniciales;
        this.createBarraDeVida();
    }

    // Crear la barra de vida en el DOM
    createBarraDeVida() {
        // Contenedor de la barra de vida
        this.barraDeVidaContainer = document.createElement('div');
        this.barraDeVidaContainer.id = 'barraDeVidaContainer';
        this.barraDeVidaContainer.style.position = 'absolute';
        this.barraDeVidaContainer.style.top = '10px';
        this.barraDeVidaContainer.style.right = '10px';
        this.barraDeVidaContainer.style.display = 'flex';
        this.barraDeVidaContainer.style.gap = '10px';
        document.body.appendChild(this.barraDeVidaContainer);

        // Crear los engranajes (vidas)
        this.engranajes = [];
        for (let i = 0; i < this.maxVidas; i++) {
            const engranaje = document.createElement('div');
            engranaje.className = 'engranaje';
            engranaje.innerHTML = '⚙️'; // Símbolo de engranaje
            engranaje.style.fontSize = '24px';
            this.barraDeVidaContainer.appendChild(engranaje);
            this.engranajes.push(engranaje);
        }
    }

    // Reducir una vida
    perderVida() {
        if (this.vidas > 0) {
            this.vidas--;
            this.engranajes[this.vidas].style.opacity = '0.3'; // Opacidad para indicar vida perdida
        }
        return this.vidas > 0; // Devuelve true si aún hay vidas
    }

    // Reiniciar la barra de vida
    reiniciar() {
        this.vidas = this.maxVidas;
        this.engranajes.forEach(engranaje => engranaje.style.opacity = '1');
    }
}