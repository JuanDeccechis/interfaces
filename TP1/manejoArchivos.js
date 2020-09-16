"use strict";

document.querySelector("#cargarImagen").addEventListener("change", cargarArchivo);
document.querySelector("#descargarEditada").addEventListener("click", descargarEditada);
document.querySelector("#descargarFiltrada").addEventListener("click", descargarFiltrada);

function cargarArchivo() {
    let archivo = document.querySelector("#cargarImagen").files[0];
    let reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = function() {
        let content = reader.result;
        let image = new Image();
        image.src = content;
        image.onload = function() {
            while (image.width > canvas.width){
                image.width = 0.8 * image.width;
                image.height = 0.8 * image.height;
            }
            while (image.height > canvas.height){
                image.width = 0.8 * image.width;
                image.height = 0.8 * image.height;
            }
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, image.width, image.height);
        }
    }
}

function descargarEditada() {
    if (document.getElementById("linkDescargaEditada")){
        document.getElementById("linkDescargaEditada").remove();
    }
    let link = document.createElement("a");
    link.id = "linkDescargaEditada";
    link.download = "imageDownloadedFromCanvas.png";
    link.href = document.querySelector("#canvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();   
}

function descargarFiltrada() {
    if (document.getElementById("linkDescargaFiltrada")){
        document.getElementById("linkDescargaFiltrada").remove();
    }
    let link = document.createElement("a");
    link.id = "linkDescargaFiltrada";
    link.download = "imageDownloadedFromCanvas.png";
    link.href = document.querySelector("#canvasResultadoFiltro").toDataURL("image/png").replace("image/png", "image/octet-stream");
    link.click();   
}