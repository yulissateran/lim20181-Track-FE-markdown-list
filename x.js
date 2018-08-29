const mdLinks = require('./index.js');

mdLinks('test/', { state: true, validate: true })
  .then(res => console.log(res))
  .catch(err => console.log(err));
