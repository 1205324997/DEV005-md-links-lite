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
    console.log(`La ruta: ${pathResolve} es válida`);//si la promesa se cumple nos manda un mensaje es valida 
  })
  .catch((error) => {//si la promesa no se cumple nos arroja error
    console.log(error);
  });
