const requestToLink = require('request-link.js');

const linkValidation = (arrayLinks) => {
  const newArray = arrayLinks.map(async(objectLink) => {
    try {
      objectLink.validate = await requestToLink(objectLink.url);
      return objectLink;      
    } catch (err) {
      throw err;
    }
  });
  return newArray;
};
module.exports = linkValidation;
