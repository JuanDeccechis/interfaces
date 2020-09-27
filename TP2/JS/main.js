"use strict";
document.addEventListener("DOMContentLoaded", function(event) {
    document.querySelector("#jugar").addEventListener("click", configurar);
    document.querySelector("#atras").addEventListener("click", volverAConfigurar);
    document.querySelector("#NEnLinea").addEventListener("change", cambiarNEnLinea);
    cargarImagenes();
});

let config =  new Configuracion();
let tablero = new Tablero();
let turnoJugador1 = true;
let juego = [];
let fichasJugador1 = [];
let fichasJugador2 = [];
let margenWidth = 100; //espacio para la ubicacion de fichas
let margenHeight = 100; //espacio arriba para depositar las fichas
let canvas = document.querySelector("#canvas");
let ctx = this.canvas.getContext("2d");
let ficha = {
    color: "white",
    radio: 25
};
let imagenFichaRoja;
let imagenFichaAzul;
let imagenFichaVerde;
function cargarImagenes(){
    let imagenAzul = new Image();
    imagenAzul.src = "images/fichaAzulTransparente.png";
    imagenAzul.onload = function() {
        imagenAzul.width = 2 * ficha.radio;
        imagenAzul.height = 2 * ficha.radio;
        imagenFichaAzul = imagenAzul;
    };
    let imagenRoja = new Image();
    imagenRoja.src = "images/fichaRojaTransparente.png";
    imagenRoja.onload = function() {
        imagenRoja.width = 2 * ficha.radio;
        imagenRoja.height = 2 * ficha.radio;
        imagenFichaRoja = imagenRoja;
    };
    let imagenVerde = new Image();
    imagenVerde.src = "images/fichaVerdeTransparente.png";
    imagenVerde.onload = function() {
        imagenVerde.width = 2 * ficha.radio;
        imagenVerde.height = 2 * ficha.radio;
        imagenFichaVerde = imagenVerde;
    };
}

/*CONFIGURACION */
function configurar(event) {
    event.preventDefault();
    event.stopPropagation();
    config.setFilas(document.querySelector("#filasTablero").value);
    config.setColumnas(document.querySelector("#columnasTablero").value);
    config.setDisabled();
    crearJuego();
    crearFichas();
}

function cambiarNEnLinea(){
    config.setCantidadParaGanar(document.querySelector("#NEnLinea").value);
    config.cambiarNEnLinea();
}

function volverAConfigurar() {
    let elementos = document.querySelector("#botones");
    while (elementos.firstChild) {
        elementos.removeChild(elementos.lastChild);
    }
    config.setEnabled();
    document.querySelector("#atras").setAttribute("disabled", true);
    mostrarTurno("noMostrar");
    tablero.limpiarTablero();
}

function crearJuego() { //finaliza las configuraciones para poder jugar
    let juegoHTML = document.querySelector("#botones");
    let cantidadColumnasJuego = config.getColumnas();
    document.querySelector("#atras").removeAttribute("disabled");
    for (let index = 0; index < cantidadColumnasJuego; index++) {
        let elemento = document.createElement("BUTTON");
        elemento.setAttribute("class", "columna");
        elemento.innerHTML = `columna ${index}`;
        elemento.addEventListener("click", () => jugar(index));
        juegoHTML.appendChild(elemento);   
    }
    juego = [];
    fichasJugador1 = [];
    fichasJugador2 = [];
    for (let i = 0; i < config.getFilas(); i++) {
        juego[i]= [];
        for (let j = 0; j < config.getColumnas(); j++) {
            juego[i][j] = 0;
        }   
    }
    tablero.crearTablero(config.getFilas(), config.getColumnas());
    mostrarTurno();
    console.table(juego);
}

function mostrarTurno(debeMostrar){
    let elementoTurno = document.querySelector("#turno");
    let aMostrar = "Turno de ";
    if (debeMostrar === "noMostrar") {
        aMostrar = "";
    }
    else {
        if (turnoJugador1) {
            aMostrar = aMostrar + document.querySelector("#jugador1").value;
        }
        else {
            aMostrar = aMostrar + document.querySelector("#jugador2").value;
        }
    }
    elementoTurno.innerHTML = aMostrar;
}

//LOGICA
function jugar(columna){
    let fila = calcularProximaFila(juego, columna);
    if (fila !== -1) {
        if (turnoJugador1) {
            juego[fila][columna] = 1;
        }
        else {
            juego[fila][columna] = 2;
        }
        tablero.pintarJugada(fila, columna, turnoJugador1);
        if (revisarNEnLinea(juego, fila, columna, config.getCantidadParaGanar())) {
            let ganador;
            if (turnoJugador1) {
                ganador = document.querySelector("#jugador1").value;
            } else {
                ganador = document.querySelector("#jugador2").value;
            }
            alert(`felicitaciones ${ganador}!!!`);
            document.querySelector("#atras").innerHTML = "volver a jugar";
            let elementos = document.querySelector("#botones");
            while (elementos.firstChild) {
                elementos.removeChild(elementos.lastChild);
            }
        }
        else {
            turnoJugador1 = !turnoJugador1;
            mostrarTurno();
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

//CREACION DE FICHAS
function crearFichas(){
    let fichas = config.getFilas() * config.getColumnas() / 2;
    let objetoFicha;
    let posicionXEnCrearFicha;
    let posicionYEnCrearFicha
    for (let index = 0; index < fichas; index++) {
        posicionXEnCrearFicha = calcularRandomLimitado(0, margenWidth - 2 * ficha.radio);
        posicionYEnCrearFicha = calcularRandomLimitado(margenHeight, canvas.height - 2 * ficha.radio);
        objetoFicha = new Ficha(posicionXEnCrearFicha, posicionYEnCrearFicha, ficha.radio, imagenFichaRoja, ctx);
        objetoFicha.dibujar();
        fichasJugador1.push(objetoFicha);
    }
    for (let index = 0; index < fichas; index++) {
        posicionXEnCrearFicha = calcularRandomLimitado(canvas.width - margenWidth, canvas.width - 2 * ficha.radio);
        posicionYEnCrearFicha = calcularRandomLimitado(margenHeight, canvas.height - 2 * ficha.radio);
        objetoFicha = new Ficha(posicionXEnCrearFicha, posicionYEnCrearFicha, ficha.radio, imagenFichaAzul, ctx);
        objetoFicha.dibujar();
        fichasJugador2.push(objetoFicha);
    }
}

function calcularRandomLimitado(min, max){
    return min + Math.random() * (max - min);
}