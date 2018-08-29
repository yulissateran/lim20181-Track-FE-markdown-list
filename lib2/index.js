const getLinksFileOrDirectory = require('./get-links');
const getStatusLinks = require('./get-status-links').getStatusLinks;
const getValidateLinks = require('./get-validate-links');
const validateAndStateLinks = require('./validate-and-state');

const mdLinks = async(path, options) => {
  //  path  = path || __dirname;
  const { validate, state } = options;
  let result = '';
  if (path && !validate && !state) {
    result = await getLinksFileOrDirectory(path);
  } else if (path && validate && !state) {
    result = await getValidateLinks(path);
  } else if (path && !validate && state) {
    result = await getStatusLinks(path);
  }else if (path && validate && state) {
    result = validateAndStateLinks(path)
  }
  return result;
};

// module.exports = mdLinks;
