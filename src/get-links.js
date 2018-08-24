const converterPathToAbsolute = require('converter-path.js');
import identifyFileOrDirectory from 'identify-file-directory.js'
import getFilesDirectory from 'get-files-directory.js'
import getFilesMd from 'get-files-md';
import myReadDir from 'read-dir.js';
import myReadFile from 'read-file.js';
console.log(converterPathToAbsolute, myReadDir)
// eslint-disable-next-line
const getLinksFileOrDirectory = async (route) => {
  try {
    const absoluteRoute = converterPathToAbsolute(route);
    const routeIs = await identifyFileOrDirectory(absoluteRoute);
    if (routeIs === 'directory') {
      const files = await getFilesDirectory(bsoluteRoute);
      const filesMd = await getFilesMd(files);
      const linksDir = await myReadDir(filesMd);
      return linksDir;
    } else {
      return 
      await myReadFile(absoluteRoute)
    }
  } catch (err) {
    return err;
  }
}

export default getLinksFileOrDirectory;

// getLinksFileOrDirectory('../README.md').then((response)=> console.log(response, response.length))
// .catch((err)=>{console.log(err)});