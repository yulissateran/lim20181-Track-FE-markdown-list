/* toma el arreglo de rutas retorna todos los que sean .md */
const path = require('path');

const getFilesMd = (files) => {
  return files.filter(file => path.extname(file) === '.md');
};
// module.exports = getFilesMd;

