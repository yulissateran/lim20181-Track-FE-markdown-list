const getLinksFileOrDirectory = require('./get-links.js');
const linkValidation = require('link-validation.js');

const getValidateLinks = async(route) => {
  try{ 
      const links = await getLinksFileOrDirectory(route);
      const  iterable = await linkValidation(links);
      const resolvedPromises = await Promise.all(iterable)
      return resolvedPromises;
  } catch(err){
    return err;
  }
  };

module.exports = getValidateLinks;