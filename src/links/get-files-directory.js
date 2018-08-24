const dir = require('node-dir');

const getFilesDirectory = (directory) => {
  return new Promise((resolve, reject) => {
    dir.files(directory, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
};
module.exports = getFilesDirectory;
// getFilesDirectory('./carpeta')
