const fs = require('fs');

// obtiene contenido de un archivo
const getFileContent = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
// module.exports = getFileContent;
