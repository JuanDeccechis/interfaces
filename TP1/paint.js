"use strict";

let ctx = document.querySelector("#canvas").getContext("2d");
let figura = "";
let widthInicial = 0;
let heightInicial = 0;
let grosor = "1";
let color = "black";
let sigueDibujando = false;
let posicionesIniciales = document.querySelector("#canvas").getBoundingClientRect();


document.querySelector("#rectangulo").addEventListener("click", dibujarRectangulo);
document.querySelector("#lapiz").addEventListener("click", dibujar);
document.querySelector("#goma").addEventListener("click", borrar);
document.querySelector("#grosor").addEventListener("change", cambiarGrosor);
document.querySelector("#colorLapiz").addEventListener("change", cambiarColor);


function dibujarRectangulo() {
    color = document.querySelector("#colorLapiz").value;
    document.querySelector("#canvas").addEventListener("mousedown", empezarDibujar);
    figura = "rectangulo";
    sigueDibujando = false;
}

function cambiarGrosor() {
    grosor = document.querySelector("#grosor").value;
}

function cambiarColor() {
    color = document.querySelector("#colorLapiz").value;
}

function borrar() {
    color = "white";
    document.querySelector("#canvas").addEventListener("mousedown", empezarDibujar);
    figura = "linea";
    sigueDibujando = true;
}

function dibujar() {
    color = document.querySelector("#colorLapiz").value;
    document.querySelector("#canvas").addEventListener("mousedown", empezarDibujar);
    figura = "linea";
    sigueDibujando = true;
}

function empezarDibujar(event) {
    widthInicial = event.clientX - posicionesIniciales.left;
    heightInicial = event.clientY - posicionesIniciales.top;
    
    document.querySelector("#canvas").removeEventListener("mousedown", empezarDibujar);
    document.querySelector("#canvas").addEventListener("mouseup", terminaDibujar);
    if (figura === "linea"){
        document.querySelector("#canvas").addEventListener("mousemove", seguirDibujando);
    }
}

function seguirDibujando(event) {
    let widthFinal = event.clientX  - posicionesIniciales.left;
    let heightFinal = event.clientY - posicionesIniciales.top;
    ctx.beginPath(); 
    ctx.lineWidth = grosor; 
    ctx.strokeStyle = color;
    ctx.moveTo(widthInicial, heightInicial);
    ctx.lineTo(widthFinal, heightFinal);
    widthInicial = widthFinal;
    heightInicial = heightFinal;
    ctx.stroke();
}

function terminaDibujar(event) {
    let widthFinal = event.clientX  - posicionesIniciales.left;
    let heightFinal = event.clientY - posicionesIniciales.top;
    document.querySelector("#canvas").removeEventListener("mouseup", terminaDibujar);
    if (sigueDibujando) {
        document.querySelector("#canvas").removeEventListener("mousemove", seguirDibujando);
        sigueDibujando = false;
        if (color == "white") {
            borrar();
        } else {
            dibujar();
        }
    }
    ctx.beginPath(); 
    ctx.lineWidth = grosor; 
    ctx.strokeStyle = color;
    switch (figura) {
        case "rectangulo":
            ctx.fillStyle = color;
            ctx.fillRect(widthInicial, heightInicial, widthFinal - widthInicial, heightFinal - heightInicial);
            dibujarRectangulo();
            break;
        case "linea":
            ctx.moveTo(widthInicial, heightInicial);
            ctx.lineTo(widthFinal, heightFinal);
            ctx.stroke();
            break;
        default:
            break;
    }
}
