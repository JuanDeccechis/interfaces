"use strict";

document.querySelector("#jugar").addEventListener("click", configurar);
document.querySelector("#atras").addEventListener("click", volverAConfigurar);
document.querySelector("#NEnLinea").addEventListener("change", cambiarNEnLinea);

let config =  new Configuracion();
let turnoJugador1 = true;
let juego = [];

function configurar(event) {
    event.preventDefault();
    event.stopPropagation();
    config.setDisabled();
    crearJuego();
}

function cambiarNEnLinea(){
    config.setCantidadParaGanar(document.querySelector("#NEnLinea").value);
    config.cambiarNEnLinea();
}

function volverAConfigurar() {
    let elementos = document.querySelector("#juego");
    while (elementos.firstChild) {
        elementos.removeChild(elementos.lastChild);
    }
    config.setEnabled();
    document.querySelector("#atras").setAttribute("disabled", true);
}

function crearJuego() {
    let juegoHTML = document.querySelector("#juego");
    let cantidadColumnasJuego = config.getColumnas();
    document.querySelector("#atras").removeAttribute("disabled");
    for (let index = 0; index < cantidadColumnasJuego; index++) {
        let elemento = document.createElement("BUTTON");
        elemento.innerHTML = `columna ${index}`;
        elemento.addEventListener("click", () => jugar(index));
        juegoHTML.appendChild(elemento);   
    }
    for (let i = 0; i < config.getFilas(); i++) { //0 - 5
        juego[i]= [];
        for (let j = 0; j < config.getColumnas(); j++) { // 0 - 6
            juego[i][j] = 0;
        }   
    }
    console.table(juego);
}

function jugar(columna){
    let fila = calcularProximaFila(juego, columna);
    if (fila !== -1) {
        if (turnoJugador1) {
            juego[fila][columna] = 1;
        }
        else {
            juego[fila][columna] = 2;
        }
        turnoJugador1 = !turnoJugador1;
        if (revisarNEnLinea(juego, fila, columna, config.getCantidadParaGanar())) {
            alert("felicitaciones!!!");
        }
    }
    else {
        console.log("jugada invalida, vuelva a intentar");
    }
    console.table(juego);
}

function calcularProximaFila(mat, columna) {
    let resul = -1;
    for (let filas = 0; filas < config.getFilas(); filas++) {
        if (mat[filas][columna] === 0) {
            resul = filas;
        }
    }
    return resul;
}

function revisarNEnLinea(juego, fila, columna, cantidad) { //podria hacer una funcion recursiva, pero dada la cantidad de filas y columnas no lo veo necesario
    let resultado = false;
    let cantidadEnVertical = revisarNEnLineaDireccion(juego, fila, columna, "vertical");
    let cantidadEnHorizontal = revisarNEnLineaDireccion(juego, fila, columna, "horizontal");
    let cantidadEnDiag1 = revisarNEnLineaDireccion(juego, fila, columna, "diagonal1");
    let cantidadEnDiag2 = revisarNEnLineaDireccion(juego, fila, columna, "diagonal2");
    if ((cantidadEnVertical >= cantidad) || (cantidadEnHorizontal >= cantidad) || (cantidadEnDiag1 >= cantidad) || (cantidadEnDiag2 >= cantidad)) {
        resultado = true;
    }
    return resultado;

}

function revisarNEnLineaDireccion(juego, fila, columna, direccion){ 
    let cantidad = 0;
    let origen = buscarOrigen(juego, fila, columna, direccion);
    let fin = buscarFin(juego, fila, columna, direccion);
    if (origen === -1) {
        origen = columna;
    } 
    if (fin === -1) {
        fin = columna;
    }
    cantidad = fin - origen + 1;
    return cantidad;
}

function buscarOrigen(juego, fila, columna, direccion) {
    let resultado = -1;
    let seguirBuscando = true;
    switch (direccion) {
        case "vertical":
            resultado = fila;
            break;
        case "horizontal":
            for (let indiceColumna = columna; indiceColumna >= 0 ; indiceColumna--) {
                if (seguirBuscando && juego[fila][indiceColumna] !== juego[fila][columna]) {
                    seguirBuscando = false;
                    resultado = indiceColumna + 1;
                }
            }
            if (seguirBuscando && juego[fila][0] === juego[fila][columna]) {
                resultado = 0;
            }
            break;
        case "diagonal1": //abajo izq
            for (let indiceColumna = columna; indiceColumna >= 0 ; indiceColumna--) {
                if ((fila+columna-indiceColumna) < config.getFilas()) {
                    if (seguirBuscando && juego[fila+columna-indiceColumna][indiceColumna] !== juego[fila][columna]) {
                        seguirBuscando = false;
                        resultado = indiceColumna + 1;
                    }
                }
                else {
                    if (seguirBuscando) {
                        resultado = indiceColumna + 1;
                        seguirBuscando = false;
                    }
                }
            }
            //correccion
            if (seguirBuscando && (fila+columna) <= (config.getFilas() -1) && juego[fila+columna][0] === juego[fila][columna]) {
                resultado = 0;
            }
            break;
        
        case "diagonal2": //arriba izq
                for (let indiceColumna = columna; indiceColumna >= 0 ; indiceColumna--) {
                    if ((fila+indiceColumna-columna) >= 0) {
                        if (seguirBuscando && juego[fila+indiceColumna-columna][indiceColumna] !== juego[fila][columna]) {
                            seguirBuscando = false;
                            resultado = indiceColumna + 1;
                        }
                    }
                    else {
                        if (seguirBuscando) {
                            resultado = indiceColumna + 1;
                            seguirBuscando = false;
                        }
                    }
                }
                //correccion
                if (seguirBuscando && (fila-columna) >= 0 && juego[fila-columna][0] === juego[fila][columna]) {
                    resultado = 0;
                }
                break;

        default:
            break;
    }
    console.log("origen: " + direccion + " - " + resultado);
    return resultado;
}

function buscarFin(juego, fila, columna, direccion) {
    let resultado = -1;
    let seguirBuscando = true;
    
    switch (direccion) {
        case "vertical":
            for (let indiceFila = fila; indiceFila < config.getFilas() ; indiceFila++) {
                if (seguirBuscando && juego[indiceFila][columna] !== juego[fila][columna]) {
                    seguirBuscando = false;
                    resultado = indiceFila - 1;
                }
            }
            if (seguirBuscando && juego[(config.getFilas() - 1)][columna] === juego[fila][columna]) {
                resultado = (config.getFilas() - 1);
            }
            break;
        case "horizontal":
            for (let indiceColumna = columna; indiceColumna < config.getColumnas() ; indiceColumna++) {
                if (seguirBuscando && juego[fila][indiceColumna] !== juego[fila][columna]) {
                    seguirBuscando = false;
                    resultado = indiceColumna - 1;
                }
            }
            if (seguirBuscando && juego[fila][config.getColumnas() -1] === juego[fila][columna]) {
                resultado = config.getColumnas() -1;
            }
            break;
        case "diagonal1": //arriba derecha
            for (let indiceColumna = columna; indiceColumna < config.getColumnas() ; indiceColumna++) {
                if ((fila+columna-indiceColumna) >= 0) {
                    if (seguirBuscando && juego[fila+columna-indiceColumna][indiceColumna] !== juego[fila][columna]) {
                        seguirBuscando = false;
                        resultado = indiceColumna - 1;
                    }
                }
                else {
                    if (seguirBuscando) {
                        resultado = indiceColumna - 1;
                        seguirBuscando = false;
                    }
                }
            }
            //correccion
            if (seguirBuscando && (fila+columna - (config.getColumnas() - 1)) >= 0 && juego[fila+columna-(config.getColumnas() -1 )][config.getColumnas() - 1] === juego[fila][columna]) {
                resultado = config.getColumnas() -1;
            }
            break;

        case "diagonal2": //arriba izq
            for (let indiceColumna = columna; indiceColumna < config.getColumnas() ; indiceColumna++) {
                if ((fila+indiceColumna-columna) < config.getFilas()) {
                    if (seguirBuscando && juego[fila+indiceColumna-columna][indiceColumna] !== juego[fila][columna]) {
                        seguirBuscando = false;
                        resultado = indiceColumna - 1;
                    }
                }
                else {
                    if (seguirBuscando) {
                        resultado = indiceColumna - 1;
                        seguirBuscando = false;
                    }
                }
            }
            //correccion
            if (seguirBuscando && (fila-columna + (config.getColumnas() -1) ) >= 0 && juego[fila-columna+ (config.getColumnas() -1)][(config.getColumnas() -1)] === juego[fila][columna]) {
                resultado = config.getColumnas() -1;
            }
            break;

        default:
            break;
    }
    console.log("fin: " + direccion + " - " + resultado);
    return resultado;
}