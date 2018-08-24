const getLinksFileOrDirectory = require('./links/get-links');
const getStatusLinks = require('./links/get-status-links');
const getValidateLinks = require('./links/get-validate-links');


const mdLinks = async(options) => {
  const { path } =  options || __dirname;
  const { validate, state } = options;
  let result = '';
  if (path && !validate && !state) {
    result = await getLinksFileOrDirectory(path);
  } else if (path && validate && !state) {
    result = await getValidateLinks(path);
  } else if (path && !validate && state) {
    result = await getStatusLinks(path);
  }
  return result;
};

module.exports = mdLinks;
