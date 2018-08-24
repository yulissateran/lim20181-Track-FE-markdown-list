const fs = require('fs');

/* Identifica si la ruta es de un archivo o directorio */
// eslint-disable-next-line
const identifyFileOrDirectory = (route) => {
  return new Promise((resolve, reject) => {
    fs.stat(route, (err, stats) => {
      if (err) reject(err);
      const routeIs = stats.isDirectory() ? 'directory' : 'file';
      resolve(routeIs);
    });
  });
};
module.exports = identifyFileOrDirectory;
// dentifyFileOrDirectory('../README.md').then((response)=>console.log(response));
