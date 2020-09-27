"use strict";

class Ficha {
    constructor(posX, posY, radio, imagen, context) {
        this.posX = posX;
        this.posY = posY;
        this.radio = radio;
        //this.color = color;
        this.imagen = imagen;
        this.imagenOriginal = imagen;
        this.context = context;
        this.seleccionada = false;
    }

    setPosicion(x, y) {
        this.posX = x;
        this.posY = y;
    }

    setSeleccionada(estaSeleccionada) {
        this.seleccionada = estaSeleccionada;
        if (estaSeleccionada){
            let posicion = this.getPosicion();
            let posicionFinX = posicion.x + 2 * this.radio;
            let posicionFinY = posicion.y + 2 * this.radio;
            console.log("seleccionada: " + posicion.x + ", " + posicion.y);
            console.log("seleccionadaFIN: " + posicionFinX + ", " + posicionFinY);
            this.setImagen(imagenFichaVerde);
            this.dibujar();
        } else {
            this.setImagen(this.imagenOriginal);
            this.dibujar();
        }
    }

    setImagen(imagen){
        this.imagen = imagen;
    }

    getPosicion() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    getPosX() {
        return this.posX;
    }

    getPosY() {
        return this.posY;
    }

    getRadio() {
        return this.radio;
    }

  /*  getColor() {
        return this.color;
    }
*/
    getContext() {
        return this.context;
    }

    getSeleccionada() {
        return this.seleccionada;
    }

    getImagen() {
        return this.imagen;
    }

    dibujar() {
        this.context.beginPath();
        this.context.drawImage(this.imagen, this.posX, this.posY, this.imagen.width, this.imagen.height);
    }

    fichaFueClickeada(posXClick, posYClick) {
        if ((this.posX < posXClick) && (posXClick < this.posX + 2 * this.radio)) {
            if ((this.posY < posYClick) && (posYClick < this.posY + 2 * this.radio)) {
                return true;
            }
        }
        return false;
    }
}