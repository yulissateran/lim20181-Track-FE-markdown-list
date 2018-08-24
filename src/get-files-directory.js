import * as dir from 'node-dir';

const getFilesDirectory = (directory) => {
  return new Promise((resolve, reject) => {
    dir.files(directory, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
};
export default getFilesDirectory;
// getFilesDirectory('./carpeta')
