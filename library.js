const { existPath, absolutePath } = require('./route.js');
const fs = require('fs');
const userPath = process.argv[2];//Para poder poner la ruta y el archivo y poder leerlos en la consola
const path = require('path');
const marked = require('marked');//Podemos trabajar con archivos .md

//Promesa que verifica si la ruta existe utilizando existPath, si la ruta existe, se resuelve la promesa con la ruta absoluta obtenida mediante absolutePath
const existMdLink = (userPath) => new Promise((resolve, reject) => {
  if (existPath(userPath)) {
    const resolvedPath = absolutePath(userPath);
    resolve(resolvedPath);
  } else {
    reject('Error');
  }
});

existMdLink(userPath)
  .then((pathResolve) => {
    console.log(`La ruta: ${pathResolve} es válida`);//si la promesa se cumple nos dice es valida y se llama a validateFileDirectory
    const fileValid = validateFileDirectory(pathResolve);//Validamos los archivos de la ruta y nos muestra todos los archivos .md
    console.log('.md encontrados:', fileValid);
  })
  .catch((error) => {//si la promesa no se cumple nos arroja error
    console.log(error);
  });

// Verificar si es archivo o directorio y muestra los archivos .md
const validateFileDirectory = (absolutePath) => {// si hay .md los agrega a un array
  let fileValid = [];
  if (fs.lstatSync(absolutePath).isFile() && path.extname(absolutePath) === '.md') {
    fileValid.push(absolutePath);
    
  }
  if (fs.lstatSync(absolutePath).isDirectory()) {
    const arrayPath = fs.readdirSync(absolutePath);//si la ruta es un directorio la leemos
    arrayPath.forEach((route) => {
      const routePath = path.join(absolutePath, route);
      fileValid = fileValid.concat(validateFileDirectory(routePath));
    });
  } else {

  }
  return fileValid;
};