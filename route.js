const path = require('path');
const fs = require('fs'); // podemos trabajar con archivos path

const userPath = process.argv[2];

// Verificar si existe la ruta
const existPath = (userPath) => {
    if (fs.existsSync(userPath)) {
        console.log('La ruta existe');
        return true;
    } else {
        console.log('La ruta no existe, no es un directorio ni un archivo válido');
        return false;
    }
};

// Revisar si la ruta es absoluta
const absolutePath = (userPath) => {
    if (path.isAbsolute(userPath)) {
        console.log('La ruta es absoluta');
        return userPath;
    } else {
        console.log('La ruta no era absoluta: ', path.resolve(userPath));
        return path.resolve(userPath);
    }
   
};

/*if (existPath(userPath)) {
    absolutePath(userPath);
}*/

module.exports = { existPath, absolutePath };