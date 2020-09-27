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
        this.ctx.strokeRect(this.getEspacioFicha(), this.getEspacioFicha(), 500 + 2 * this.getEspacioFicha(), 500 + this.getEspacioFicha());
                
        this.ctx.beginPath();
        this.ctx.fillStyle = "#CCCC00";
        let margenWidth = 100; //espacio para la ubicacion de fichas
        let margenHeight = 100; //espacio arriba para depositar las fichas
        let tableroHeight = this.canvas.height - margenHeight;
        let tableroWidth = this.canvas.width - 2 * margenWidth;

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

    pintarJugada(fila, columna, turnoJugador1) {
        let margenWidth = 100; //espacio para la ubicacion de fichas
        let margenHeight = 100; //espacio arriba para depositar las fichas
        let tableroHeight = this.canvas.height - margenHeight;
        let tableroWidth = this.canvas.width - 2 * margenWidth;
        let incrementoI = this.calcularIncremento(tableroHeight, this.getFilasTablero());
        let incrementoJ = this.calcularIncremento(tableroWidth, this.getColumnasTablero());
        let color = "blue";
        if (turnoJugador1) {
            color = "red";
        }
        this.crearAgujero(incrementoJ * (columna + 0.5) + margenWidth, incrementoI * (fila + 0.5) + margenHeight, color, this.ficha.radio);
    }
}