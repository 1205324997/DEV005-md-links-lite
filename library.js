const { existPath, absolutePath } = require('./route.js');
const fs = require('fs');
const userPath = process.argv[2];
const path = require('path');
const marked = require('marked');

// Verificamos que la ruta existe y usamos promesas para resolverlo con la ruta absoluta 
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
    console.log(`La ruta: ${pathResolve} es válida`);
    const fileValid = validateFileDirectory(pathResolve);
    console.log('.md encontrados:', fileValid);

    // Extraemos las rutas .md en todos los link y unicos link
    const returnLink = [];

    fileValid.forEach((filePath) => {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const links = extractMdLinks(fileContent, filePath);
      returnLink.push(...links); // Utilizamos spread operator para concatenar los arrays de links
    });

    console.log(returnLink);

    // Leer elementos del array returnLink y validar falsos
    returnLink.forEach((link) => {
      if (!link.url || !link.text || !link.filePath) {
        console.log(`URL encontrada: ${link.url}`);
        console.log(`Link: ${link.text}`);
        console.log(`Ruta encontrada: ${link.filePath}`);
      }
    });

    // Contar los links y los links únicos
    const linksAll = returnLink;
    const uniLinks = [];

    returnLink.forEach((link) => {
      if (!uniLinks.some((uniqueLink) => uniqueLink.url === link.url)) {
        uniLinks.push(link);
      }
    });

    console.log('Todos los links:', linksAll.length);
    console.log('Links únicos:', uniLinks.length);
  })
  .catch((error) => {
    console.log(error);
  });

//Validamos rutas si es directorio o archivo iteramos, los leemos concatenamos a la ruta 
const validateFileDirectory = (absolutePath) => {
  let fileValid = [];
  if (fs.lstatSync(absolutePath).isFile() && path.extname(absolutePath) === '.md') {
    fileValid.push(absolutePath);
  }
  if (fs.lstatSync(absolutePath).isDirectory()) {
    const arrayPath = fs.readdirSync(absolutePath);
    arrayPath.forEach((route) => {
      const routePath = path.join(absolutePath, route);
      fileValid = fileValid.concat(validateFileDirectory(routePath));
    });
  }
  return fileValid;
};

//Utilizamos una expresion regular para buscar y capturar path y lo agregamos a un array
const extractMdLinks = (fileContent, filePath) => {
  const links = [];
  const linkSearch = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
  let match;

  while ((match = linkSearch.exec(fileContent)) !== null) {
    const text = match[1]; // valor capturado texto path
    const url = match[2]; //valor capturado url path

    links.push({
      text,
      url,
      filePath
    });
  }

  return links;
};

module.exports = { validateFileDirectory, extractMdLinks };