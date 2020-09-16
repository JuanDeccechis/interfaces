"use strict";

document.querySelector("#barraProgreso").addEventListener("click", move);
document.querySelector("#binarizacion").addEventListener("click", filtroBinarizacion);
document.querySelector("#filtroNegativo").addEventListener("click", filtroNegativo);
document.querySelector("#filtroEscalaGris").addEventListener("click", filtroEscalaGris);
document.querySelector("#filtroBrillo").addEventListener("click", filtroBrillo);
document.querySelector("#filtroSepia").addEventListener("click", filtroSepia);

let porcentaje = 0;

function move(event) {
    let valor = document.querySelector("#valorBarra");
    let barraProgreso = document.querySelector("#barraProgreso");
    let posicion = barraProgreso.getBoundingClientRect();
    let width = event.clientX;
    porcentaje = 100 * (width - posicion.left) / (posicion.right - posicion.left);
    valor.style.width = porcentaje + "%";
    document.querySelector("#valorFactorResultante").value = porcentaje * 0.03;
    document.querySelector("#valorFactorResultante").innerHTML = parseFloat(porcentaje * 0.03).toFixed(2);
}

function filtroBinarizacion() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let valorPixel = 0;
    for (let j = 0; j < imageData.height; j++) {
        for (let i = 0; i < imageData.width; i++) {
            let index = (i + imageData.width * j) * 4;
            valorPixel = (imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2])/3;
            if (valorPixel < 127){
                valorPixel = 0;
            } else {
                valorPixel = 255;
            }
            imageData.data[index + 0] = valorPixel;
            imageData.data[index + 1] = valorPixel;
            imageData.data[index + 2] = valorPixel;
        }
    }
    ctxResultado.putImageData(imageData, 0, 0);
}

function filtroNegativo() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let j = 0; j < imageData.height; j++) {
        for (let i = 0; i < imageData.width; i++) {
            let index = (i + imageData.width * j) * 4;
            imageData.data[index + 0] = 255 - imageData.data[index + 0];
            imageData.data[index + 1] = 255 - imageData.data[index + 1];
            imageData.data[index + 2] = 255 - imageData.data[index + 2];
        }
    }
    ctxResultado.putImageData(imageData, 0, 0);
}

function filtroEscalaGris() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let valorPixel = 0;
    for (let j = 0; j < imageData.height; j++) {
        for (let i = 0; i < imageData.width; i++) {
            let index = (i + imageData.width * j) * 4;
            valorPixel = (imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2])/3;
            imageData.data[index + 0] = valorPixel;
            imageData.data[index + 1] = valorPixel;
            imageData.data[index + 2] = valorPixel;
        }
    }
    ctxResultado.putImageData(imageData, 0, 0);
}

function truncarValor(valorPixel) {
    if (valorPixel < 0){
        valorPixel = 0;
    } else if (255 < valorPixel){
        valorPixel = 255;
    }
    return valorPixel;
}

function filtroBrillo() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let factor = porcentaje / 100 * 3;
    for (let j = 0; j < imageData.height; j++) {
        for (let i = 0; i < imageData.width; i++) {
            let index = (i + imageData.width * j) * 4;
            imageData.data[index + 0] = truncarValor(imageData.data[index + 0] * factor);
            imageData.data[index + 1] = truncarValor(imageData.data[index + 1] * factor);
            imageData.data[index + 2] = truncarValor(imageData.data[index + 2] * factor);
        }
    }
    ctxResultado.putImageData(imageData, 0, 0);
}

function filtroSepia() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let outputRed = 0;
    let outputGreen = 0;
    let outputBlue = 0;
    let index = 0;
    for (let j = 0; j < imageData.height; j++) {
        for (let i = 0; i < imageData.width; i++) {
            index = (i + imageData.width * j) * 4;
            outputRed = (imageData.data[index + 0] * .393) + (imageData.data[index + 1] *.769) + (imageData.data[index + 2] * .189);
            outputGreen = (imageData.data[index + 0] * .349) + (imageData.data[index + 1] *.686) + (imageData.data[index + 2] * .168);
            outputBlue = (imageData.data[index + 0] * .272) + (imageData.data[index + 1] *.534) + (imageData.data[index + 2] * .131);
            imageData.data[index + 0] = outputRed;
            imageData.data[index + 1] = outputGreen;
            imageData.data[index + 2] = outputBlue;
        }
    }
    ctxResultado.putImageData(imageData, 0, 0);
}