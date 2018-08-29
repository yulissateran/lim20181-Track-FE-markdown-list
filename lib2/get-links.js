const converterPathToAbsolute = require('./converter-path.js');
const identifyFileOrDirectory = require('./identify-file-directory.js');
const getFilesDirectory = require('./get-files-directory.js');
const getFilesMd = require('./get-files-md.js');
const myReadDir = require('./read-dir.js');
const myReadFile = require('./read-file.js');
// eslint-disable-next-line
const getLinksFileOrDirectory = async (route) => {
  try {
    const absoluteRoute = await converterPathToAbsolute(route);
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
    throw err;
  }
}
// module.exports = getLinksFileOrDirectory;

