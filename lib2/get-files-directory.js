const dir = require('node-dir');

const getFilesDirectory = directory => new Promise((resolve, reject) => {
  dir.files(directory, (err, files) => ((err) ? reject(err) : resolve(files)));
});
// module.exports = getFilesDirectory;
