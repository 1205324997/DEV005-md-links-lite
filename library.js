const path = require('path');

const extractLinks = (fileContent, pathFile) => new Promise((resolve, reject) => {
  // expresion regular que captura enlaces
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/gm;
  // array nuevo que guarda las coincidencias de regex
  const links = Array.from(fileContent.matchAll(regex), (match) => ({
    // busca todas las conicidencias en el archivo
    href: match[2],
    text: match[1],
    file: path.resolve(pathFile),
  }));
  if (links.length > 0) {
    resolve(links);
    // console.log('enlaces encontrados', links);
  } else {
    reject(new Error('No se encontraron enlaces en el archivo.'));
  }
});

module.exports = {
  extractLinks,
};