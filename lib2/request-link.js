const request = require('request');
const requestToLink = (link) => {
  return new Promise((resolve, reject) => {
    request.get(link)
      .on('response', (response) => {
        const statusText = `${response.statusMessage} ${response.statusCode}`;
        resolve(statusText);
      }).on('error', (err) => {
        resolve(err.message);
      });
  });
};

// module.exports = requestToLink;
