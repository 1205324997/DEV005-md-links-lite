const path = require('path');
const fs = require('fs');

const userPath = process.argv[2];

// Verificar si existe la ruta
const existRoute = (userPath) => {
    if (fs.existsSync(userPath)) {
        console.log('La ruta existe');
        return true;
    } else {
        console.log('La ruta no existe, no es un directorio ni un archivo válido');
        return false;
    }
};

// Revisar si la ruta es absoluta
const absoluteRoute = (userPath) => {
    if (path.isAbsolute(userPath)) {
        console.log('La ruta es absoluta');
        return userPath;
    } else {
        console.log('La ruta no era absoluta: ', path.resolve(userPath));
        return path.resolve(userPath);
    }
};

// Verificar si la ruta es un archivo o directorio
const checkFileType = (userPath) => {
    const stats = fs.statSync(userPath);
    if (stats.isFile()) {
        console.log('La ruta es un archivo');
    } else if (stats.isDirectory()) {
        console.log('La ruta es un directorio');
    } else {
        console.log('La ruta no es un archivo ni un directorio');
    }
};

if (existRoute(userPath)) {
    absoluteRoute(userPath);
    checkFileType(userPath);
}

module.exports = { existRoute, absoluteRoute, checkFileType };