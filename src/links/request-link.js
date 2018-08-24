const http = require('http');

const requestToLink = (link) => {
  const response = new Promise((resolve) => {
    http.get({
      hostname: 'www.google.com',
      path: '/',
      url: link,
    }, (res) => {
      const statusText = `${res.statusMessage}  ${res.statusCode}`
      resolve(statusText);
    });
  });
  return response;
};
module.exports = requestToLink;
