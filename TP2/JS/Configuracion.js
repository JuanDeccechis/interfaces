"use strict";

class Configuracion {
    constructor() {
        this.nombreJugador1 = document.querySelector("#jugador1").value;
        this.nombreJugador2 = document.querySelector("#jugador2").value;
        this.cantidadParaGanar = document.querySelector("#NEnLinea").value;
        this.cantidadFilasJuego = document.querySelector("#filasTablero").value;
        this.cantidadColumnasJuego = document.querySelector("#columnasTablero").value;
    }

    setDisabled() {
        let formNodes = document.querySelectorAll(".formElement");
        for (let index = 0; index < formNodes.length; index++) {
            formNodes[index].setAttribute("disabled", true);
        }
    }

    setEnabled() {
        let formNodes = document.querySelectorAll(".formElement");
        for (let index = 0; index < formNodes.length; index++) {
            formNodes[index].removeAttribute("disabled");
        }
    }

    getColumnas() {
        return this.cantidadColumnasJuego;
    }

    getFilas() {
        return this.cantidadFilasJuego;
    }

    getCantidadParaGanar() {
        return this.cantidadParaGanar;
    }

    setCantidadParaGanar(cantidad) {
        this.cantidadParaGanar = cantidad;
    }
    
    cambiarNEnLinea() {
        console.log("cambbia N");
        let cantidadEnLinea = this.getCantidadParaGanar();
        if (document.querySelector("#filasTablero").value < cantidadEnLinea) {
            document.querySelector("#filasTablero").value = cantidadEnLinea;
        }
        if (document.querySelector("#columnasTablero").value < cantidadEnLinea) {
            document.querySelector("#columnasTablero").value = cantidadEnLinea;
        }
        let opcionesFilasTablero = document.querySelector("#filasTablero").getElementsByTagName("option");
        for (let index = 0; index < opcionesFilasTablero.length; index++) {
            if (opcionesFilasTablero[index].value < cantidadEnLinea){
                opcionesFilasTablero[index].setAttribute("disabled", true);
            } else {
                opcionesFilasTablero[index].removeAttribute("disabled");
            }
        }
        let opcionesColumnasTablero = document.querySelector("#columnasTablero").getElementsByTagName("option");
        for (let index = 0; index < opcionesColumnasTablero.length; index++) {
            if (opcionesColumnasTablero[index].value < cantidadEnLinea){
                opcionesColumnasTablero[index].setAttribute("disabled", true);
            } else {
                opcionesColumnasTablero[index].removeAttribute("disabled");
            }
        }
    }
}