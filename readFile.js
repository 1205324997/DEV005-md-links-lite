const fs = require('fs');

const readFile = (route) =>
  new Promise((resolve, reject) => {
    fs.readFile(route, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });

module.exports = {
  readFile,
};