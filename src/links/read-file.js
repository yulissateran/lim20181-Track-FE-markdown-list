const getFileContent = require('./get-file-content.js');
const extractAnchorLabels = require('./extract-anchor.js') ;
const convertLinksToObjects = require('./convert-links-objects.js');

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
module.exports = myReadFile;
// myReadFile('../README.md').then((response)=> console.log(response))