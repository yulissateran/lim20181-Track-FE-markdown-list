const converterPathToAbsolute = require('./converter-path.js');
const identifyFileOrDirectory = require('./identify-file-directory.js');
const getFilesDirectory = require('./get-files-directory.js');
const getFilesMd = require('./get-files-md.js');
const myReadDir = require('./read-dir.js');
const myReadFile = require('./read-file.js');
// eslint-disable-next-line
const getLinksFileOrDirectory = async (route) => {
  try {
    const absoluteRoute = converterPathToAbsolute(route);
    const routeIs = await identifyFileOrDirectory(absoluteRoute);
    if (routeIs === 'directory') {
      const files = await getFilesDirectory(absoluteRoute);
      const filesMd = await getFilesMd(files);
      const linksDir = await myReadDir(filesMd);
      return linksDir;
    } else {
      const linksFile = await myReadFile(absoluteRoute)
      return linksFile;
    }
  } catch (err) {
    return err;
  }
}
module.exports = getLinksFileOrDirectory;

// getLinksFileOrDirectory('./carpeta').then((response)=> console.log(response, response.length))
// .catch((err)=>{console.log(err)});

// getLinksFileOrDirectory('../README.md').then((response)=> console.log(response, response.length))
// .catch((err)=>{console.log(err)});