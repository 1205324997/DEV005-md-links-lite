const fs = require('fs');
const path = require('path');

const paths = (route) => {
  if (fs.existsSync(route) === true) {
    if (path.isAbsolute(route)) {
      return route;
    }
    const absolutePath = path.resolve(route);
    return absolutePath;
  }
  return undefined;
};

module.exports = {
  paths,
};