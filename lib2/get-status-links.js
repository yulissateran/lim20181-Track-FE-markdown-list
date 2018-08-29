const getLinksFileOrDirectory = require('./get-links.js');

const getLinksOfObjects = (array) =>{
  return array.map((element)=>element.href);
};

const getLinksUniques = (array) => {
  return array.filter((element, index, arr) => arr.indexOf(element) === index);
};


const getStatusLinks = async(route) => {
  try{
    const objectslinks =  await getLinksFileOrDirectory(route);
    const arrayLinksOnly = await getLinksOfObjects(objectslinks);
    const uniqueLinks = getLinksUniques(arrayLinksOnly);
    return ` total: ${ arrayLinksOnly.length} | unique : ${uniqueLinks.length} `
  }catch(err){
     throw err;
  }
};
// exports.getLinksUniques = getLinksUniques;
// exports.getLinksOfObjects = getLinksOfObjects;
// exports.getStatusLinks = getStatusLinks;
// module.exports = exports;