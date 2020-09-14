"use strict";

document.querySelector("#filtroLuminosidad").addEventListener("click", filtroLuminosidad);
document.querySelector("#filtroSaturacion").addEventListener("click", filtroSaturacion);
document.querySelector("#filtroBlur").addEventListener("click", filtroBlur);
document.querySelector("#filtroBordes").addEventListener("click", filtroBordes);

function filtroLuminosidad() {
    let canvas = document.querySelector("#canvas");
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let factor = porcentaje / 100 * 3;
    let HSV = 0;
    let HSVNuevo = 0;
    let HSL = 0;
    let RGB = 0;
    for (let j = 0; j < imageData.height; j++) {
        for (let i = 0; i < imageData.width; i++) {
            let index = (i + imageData.width * j) * 4;
            HSV = RGBtoHSV(imageData.data[index + 0], imageData.data[index + 1], imageData.data[index + 2]);
            HSL = HSVtoHSL(HSV);
            HSL.l = HSL.l * factor;
            HSVNuevo = HSLtoHSV(HSL);
            RGB = HSVtoRGB(HSVNuevo);
            imageData.data[index + 0] = RGB.r;
            imageData.data[index + 1] = RGB.g;
            imageData.data[index + 2] = RGB.b;
        }
    }
    ctxResultado.putImageData(imageData, 0, 0);    
}

function filtroSaturacion() {
    let canvas = document.querySelector("#canvas");
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let factor = porcentaje / 100 * 3;
    let HSV = 0;
    let HSVNuevo = 0;
    let HSL = 0;
    let RGB = 0;
    for (let j = 0; j < imageData.height; j++) {
        for (let i = 0; i < imageData.width; i++) {
            let index = (i + imageData.width * j) * 4;
            HSV = RGBtoHSV(imageData.data[index + 0], imageData.data[index + 1], imageData.data[index + 2]);
            HSL = HSVtoHSL(HSV);
            HSL.s = HSL.s * factor;
            HSVNuevo = HSLtoHSV(HSL);
            RGB = HSVtoRGB(HSVNuevo);
            imageData.data[index + 0] = RGB.r;
            imageData.data[index + 1] = RGB.g;
            imageData.data[index + 2] = RGB.b;
        }
    }
    ctxResultado.putImageData(imageData, 0, 0);
}

function getVecinos(imageData, i, j) {
    let vecinos = [];
    for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
            if (((i + kx) >= 0) && ((j + ky) >= 0)) {
                vecinos.push(((i + kx) + imageData.width * (j + ky)) * 4);
            }
        }
    }
    return vecinos;
}

function filtroBlur(){
    let canvas = document.querySelector("#canvas");
    let originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let imageDataResult = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let index = 0;
    let sumRed = 0;
    let sumGreen = 0;
    let sumBlue = 0;
    let pixelesVecinos = [];
    let factor = porcentaje / 100 * 3;
    for (let j = 0; j < originalImageData.height; j++) {
        for (let i = 0; i < originalImageData.width; i++) {
            sumRed = 0;
            sumGreen = 0;
            sumBlue = 0;
            index = (i + originalImageData.width * j) * 4;
            pixelesVecinos = getVecinos(originalImageData, i, j);
            for (let z = 0; z < pixelesVecinos.length; z++) {
                sumRed = sumRed + originalImageData.data[pixelesVecinos[z] + 0];
                sumGreen = sumGreen + originalImageData.data[pixelesVecinos[z] + 1];
                sumBlue = sumBlue + originalImageData.data[pixelesVecinos[z] + 2];
            }
            imageDataResult.data[index + 0] = (1.0 * sumRed / pixelesVecinos.length) * factor;
            imageDataResult.data[index + 1] = (1.0 * sumGreen / pixelesVecinos.length) * factor;
            imageDataResult.data[index + 2] = (1.0 * sumBlue / pixelesVecinos.length) * factor;
        }
    }
    ctxResultado.putImageData(imageDataResult, 0, 0);
}

function filtroBordes() {
    let canvas = document.querySelector("#canvas");
    let originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let imageDataResult = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let index = 0;
    let sumTono = 0;
    let valorPixel = 0;
    let pixelesVecinos = [];
    for (let j = 0; j < originalImageData.height; j++) {
        for (let i = 0; i < originalImageData.width; i++) {
            sumTono = 0;
            index = (i + originalImageData.width * j) * 4;
            pixelesVecinos = getVecinos(originalImageData, i, j);
            for (let z = 0; z < pixelesVecinos.length; z++) {
                valorPixel = (1.0 * originalImageData.data[pixelesVecinos[z] + 0] + originalImageData.data[pixelesVecinos[z] + 1] + originalImageData.data[pixelesVecinos[z] + 2])/3;
                sumTono = sumTono + valorPixel;
            }
            valorPixel = (1.0 * originalImageData.data[index + 0] + originalImageData.data[index + 1] + originalImageData.data[index + 2])/3;
            imageDataResult.data[index + 0] = pixelesVecinos.length * valorPixel - sumTono;
            imageDataResult.data[index + 1] = pixelesVecinos.length * valorPixel - sumTono;
            imageDataResult.data[index + 2] = pixelesVecinos.length * valorPixel - sumTono;
        }
    }
    ctxResultado.putImageData(imageDataResult, 0, 0);
}

/* accepts parameters
 * r  Object = {r:x, g:y, b:z}
 * OR 
 * r, g, b
*/
function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    let max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h, //*360
        s: s,
        v: v
    };
}

/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR 
 * h, s, v
*/
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function HSVtoHSL(h, s, v) {
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    var _h = h,
        _s = s * v,
        _l = (2 - s) * v;
    _s /= (_l <= 1) ? _l : 2 - _l;
    _l /= 2;

    return {
        h: _h,
        s: _s,
        l: _l
    };
}

function HSLtoHSV(h, s, l) {
    if (arguments.length === 1) {
        s = h.s, l = h.l, h = h.h;
    }
    var _h = h,
        _s,
        _v;

    l *= 2;
    s *= (l <= 1) ? l : 2 - l;
    _v = (l + s) / 2;
    _s = (2 * s) / (l + s);

    return {
        h: _h,
        s: _s,
        v: _v
    };
}
