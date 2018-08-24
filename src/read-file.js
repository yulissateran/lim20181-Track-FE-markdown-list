import getFileContent from 'get-file-content.js';
import extractAnchorLabels from 'extract-anchor.js';
import convertLinksToObjects from 'convert-links-objects.js';

/* se ejecuta si la ruta es de un archivo */
const myReadFile = async(path) => {
  try{
  const contentFile = await getFileContent(path);
  const anchorLabelsArray = await extractAnchorLabels(contentFile);
  const objectLinksArray = await convertLinksToObjects(anchorLabelsArray, path);
  return objectLinksArray;
  } catch (err){
    return err;
  } 
};
export default myReadFile;
// myReadFile('../README.md').then((response)=> )