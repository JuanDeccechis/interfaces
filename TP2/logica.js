"use strict";

document.querySelector("#ficha1").addEventListener("click", () => jugar(0));
document.querySelector("#ficha2").addEventListener("click", () => jugar(1));
document.querySelector("#ficha3").addEventListener("click", () => jugar(2));
document.querySelector("#ficha4").addEventListener("click", () => jugar(3));
document.querySelector("#ficha5").addEventListener("click", () => jugar(4));
document.querySelector("#ficha6").addEventListener("click", () => jugar(5));
document.querySelector("#ficha7").addEventListener("click", () => jugar(6));

let turnoJugador1 = true;
let juego = [];
for (let i = 0; i < 6; i++) { //0 - 5
    juego[i]= [];
    for (let j = 0; j < 7; j++) { // 0 - 6
        juego[i][j] = 0;
    }   
}
console.table(juego);

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
        if (revisarNEnLinea(juego, fila, columna, 4)) {
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
    for (let filas = 0; filas < 6; filas++) {
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
                if ((fila+columna-indiceColumna) < 6) {
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
            if (seguirBuscando && (fila+columna) <= 6 && juego[fila+columna][0] === juego[fila][columna]) {
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
            for (let indiceFila = fila; indiceFila < 6 ; indiceFila++) {
                if (seguirBuscando && juego[indiceFila][columna] !== juego[fila][columna]) {
                    seguirBuscando = false;
                    resultado = indiceFila - 1;
                }
            }
            if (seguirBuscando && juego[5][columna] === juego[fila][columna]) {
                resultado = 5;
            }
            break;
        case "horizontal":
            for (let indiceColumna = columna; indiceColumna < 7 ; indiceColumna++) {
                if (seguirBuscando && juego[fila][indiceColumna] !== juego[fila][columna]) {
                    seguirBuscando = false;
                    resultado = indiceColumna - 1;
                }
            }
            if (seguirBuscando && juego[fila][6] === juego[fila][columna]) {
                resultado = 6;
            }
            break;
        case "diagonal1": //arriba derecha
            for (let indiceColumna = columna; indiceColumna < 7 ; indiceColumna++) {
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
            if (seguirBuscando && (fila+columna - 6) >= 0 && juego[fila+columna-6][6] === juego[fila][columna]) {
                resultado = 6;
            }
            break;

        case "diagonal2": //arriba izq
            for (let indiceColumna = columna; indiceColumna < 7 ; indiceColumna++) {
                if ((fila+indiceColumna-columna) < 6) {
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
            if (seguirBuscando && (fila-columna + 6) >= 0 && juego[fila-columna+6][6] === juego[fila][columna]) {
                resultado = 6;
            }
            break;

        default:
            break;
    }
    console.log("fin: " + direccion + " - " + resultado);
    return resultado;
}