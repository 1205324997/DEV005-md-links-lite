const { paths } = require('./route');
const { readFile } = require('./readFile');
const { extractLinks } = require('./library');
const { validateLinks } = require('./validate');

function mdLinks(filePath, options = {}) {
  return new Promise((resolve, reject) => {
    const absolutePath = paths(filePath);

    if (!absolutePath) {
      reject(new Error('La ruta no existe.'));
      return;
    }

    console.log('Leyendo archivo...');
    readFile(absolutePath)
      .then((fileContent) => {
        console.log('Extrayendo enlaces...');
        extractLinks(fileContent, absolutePath)
          .then((links) => {
            if (Array.isArray(links) && links.length > 0) {
              console.log('Enlaces extraídos:', links);
              if (options.validate) {
                console.log('Validando enlaces...');
                validateLinks(links)
                  .then((validatedLinks) => {
                    console.log('Enlaces validados:', validatedLinks);
                    resolve(validatedLinks);
                  })
                  .catch((error) => {
                    console.error('Error al validar los enlaces:', error);
                    reject(error);
                  });
              } else {
                resolve(links);
              }
            } else {
              console.log('No se encontraron enlaces en el archivo.');
              resolve([]);
            }
          })
          .catch((error) => {
            console.error('Error al extraer los enlaces:', error);
            reject(error);
          });
      })
      .catch((error) => {
        console.error('Error al leer el archivo:', error);
        reject(error);
      });
  });
}

// Llamar a la función mdLinks
mdLinks('./README.md', { validate: true })
  .then((links) => {
    console.log('Resultados:', links);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  module.exports = {
    mdLinks,
  };