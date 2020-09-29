"use strict";

class Tablero {
    constructor() {
        this.canvas = document.querySelector("#canvas");
        this.ctx = this.canvas.getContext("2d");
        this.ficha = {
            color: "white",
            radio: 25
        };
        this.filasTablero = 0;
        this.columnasTablero = 0;
        this.margenWidth = 150; //espacio para la ubicacion de fichas
        this.margenHeight = 100; //espacio arriba para depositar las fichas
    }

    getFilasTablero() {
        return this.filasTablero;
    }

    getColumnasTablero() {
        return this.columnasTablero;
    }

    setFilasTablero(filas) {
        this.filasTablero = filas;
    }

    setColumnasTablero(columnas) {
        this.columnasTablero = columnas;
    }

    crearTablero(filas, columnas) {
        this.setFilasTablero(filas);
        this.setColumnasTablero(columnas);
        //borde
        this.ctx.beginPath();
        this.ctx.strokeStyle = "#555555";
        this.ctx.strokeRect(this.margenWidth - this.getEspacioFicha(), this.getEspacioFicha(), 500 + 2 * this.getEspacioFicha(), 500 + this.getEspacioFicha());
                
        this.ctx.beginPath();
        this.ctx.fillStyle = "#CCCC00";
        let tableroHeight = this.canvas.height - this.margenHeight;
        let tableroWidth = this.canvas.width - 2 * this.margenWidth;

        this.ctx.fillRect(margenWidth, margenHeight, tableroWidth, tableroHeight);
        let incrementoI = this.calcularIncremento(tableroHeight, filas);
        let incrementoJ = this.calcularIncremento(tableroWidth, columnas); 
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                this.crearAgujero(incrementoJ * (j + 0.5) + margenWidth, incrementoI * (i + 0.5) + margenHeight, this.ficha.color, this.ficha.radio); //uso * (1 + 0.5) para moverme un radio para crear los circulos
            }        
        }
    }

    limpiarTablero() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
           
    }

    /* FUNCIONES PRIVADAS */
    getEspacioFicha(){
        return 2 * this.ficha.radio;
    }
    
    calcularIncremento(total, cantidad){
    // # pixeles por figura. 
        return total / cantidad;
    }
    
    crearAgujero(posx, posy, color, radio){
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle= color;
        this.ctx.arc(posx, posy, radio, 0, 2 * Math.PI, false);
        this.ctx.fill();
        this.ctx.stroke();
    }

    getColumnaAJugar(posicionX, posicionY) {
        let inicioTableroWidth = 150; //espacio para la ubicacion de fichas
        let tableroWidth = this.canvas.width - 2 * inicioTableroWidth;
        let finTableroWidth = this.canvas.width - inicioTableroWidth;
        let resultado = -2;
        let inicioEjemploHeight = 0;
        let finEjemploHeight = 2 * this.ficha.radio;
        if ((posicionX < inicioTableroWidth) || (posicionX > finTableroWidth)) {
            resultado = -1;
        }
        else {
            if ((posicionY < inicioEjemploHeight) || (posicionY > finEjemploHeight)) {
                resultado = -1;
            }
            else {
                let incrementoJ = this.calcularIncremento(tableroWidth, this.getColumnasTablero());
                for (let index = 0; index < this.getColumnasTablero(); index++) {
                    if (posicionX < incrementoJ * (index + 1) + inicioTableroWidth) {
                        if (resultado === -2) {
                            resultado = index;
                        }
                    }
                }
            }
        }
        return resultado;
    }

    pintarJugada(fila, columna, turnoJugador1, ficha) {
        //document.querySelectorAll(".columna")[columna].setAttribute("disabled", true);
        let margenWidth = 150; //espacio para la ubicacion de fichas
        let margenHeight = 100; //espacio arriba para depositar las fichas
        let tableroHeight = this.canvas.height - margenHeight;
        let tableroWidth = this.canvas.width - 2 * margenWidth;
        let incrementoI = this.calcularIncremento(tableroHeight, this.getFilasTablero());
        let incrementoJ = this.calcularIncremento(tableroWidth, this.getColumnasTablero());
        let color = "blue";
        if (turnoJugador1) {
            color = "red";
        }
        if (fila >= 0) {
            this.animarCaida(fila, color, this.ficha.radio, incrementoJ * (columna + 0.5) + margenWidth, incrementoI, margenHeight, ficha);
        }
        else {
            this.crearAgujero(incrementoJ * (columna + 0.5) + margenWidth, this.ficha.radio, color, this.ficha.radio);
        }
    }

    tableroFueClickeado(posX, posY){
        if ((this.margenWidth < posX) && (posX < this.margenWidth + 500)) {
            if ((this.margenHeight < posY) && (posY < this.margenHeight + 500)) {
                return true;
            }
        }
        return false;
    }

    tableroExtendidoFueClickeado(posX, posY){
        if ((this.margenWidth - 2 * this.ficha.radio < posX) && (posX < this.margenWidth + 500 + 2 * this.ficha.radio)) {
            if ((this.margenHeight - 2 * this.ficha.radio < posY) && (posY < this.margenHeight + 500)) {
                return true;
            }
        }
        return false;
    }

    animarCaida(fila, color, radio, posicionX, incremento, margen, ficha){
        let limpiarIntervalo = 0;
        let intervalo = setInterval(() => {
            if (limpiarIntervalo > fila) {
                this.crearAgujero(posicionX, incremento * (limpiarIntervalo - 0.5) + margen, "white", radio);
                ficha.setPosicion(posicionX - this.ficha.radio, incremento * (limpiarIntervalo - 0.5) + margen - this.ficha.radio);
                ficha.setSeleccionada(false);
                ficha.dibujar();
                clearInterval(intervalo);
            }
            else {
                if (limpiarIntervalo > 0) {
                    this.crearAgujero(posicionX, incremento * (limpiarIntervalo - 0.5) + margen, "white", radio); //borro el anterior
                }
                this.crearAgujero(posicionX, incremento * (limpiarIntervalo + 0.5) + margen, color, radio);
                limpiarIntervalo ++;
        }}, 500);
    }
}