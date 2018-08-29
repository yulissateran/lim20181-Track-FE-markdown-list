const requestToLink = require('./request-link.js');

const linkValidation = (arrayLinks) => {
  const newArray = arrayLinks.map(async(objectLink) => {
    try {
      objectLink.state = objectLink.href ? await requestToLink(objectLink.href) : 'Not Found 404';
      return objectLink; 
    } catch (err) {
      throw  err;
    }
  });
  return newArray;
};

// module.exports = linkValidation;
