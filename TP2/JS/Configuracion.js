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
}