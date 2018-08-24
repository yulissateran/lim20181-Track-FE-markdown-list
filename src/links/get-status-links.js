const getLinksFileOrDirectory = require('./get-links.js');


const getStatusLinks = async(route) => {
  try{
    const objectslinks =  await getLinksFileOrDirectory(route);
    const arrayLinksOnly = await objectslinks.map((element)=>element.href);
    const uniqueLinks = arrayLinksOnly.filter((element, index, arr) => arr.indexOf(element) === index);
    return ` TOTAL:  ${ arrayLinksOnly.length},  ÚNICOS: ${uniqueLinks.length} `
  }catch(err){
     return err;
  }
  
};
module.exports = getStatusLinks;

// getStatusLinks('../carpeta').then((res)=> console.log(res))