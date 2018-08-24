#!/usr/bin/env node
const nopt = require('nopt');
const path = require('path');
const mdLinks = require('./index.js');

const option = {
  path: __dirname,
  validate: false,
  state: false,
};
const parsed = nopt(
  {
    path,
    validate: Boolean,
    state: Boolean,
  },
  {
    path: '-p',
    state: '--state',
    validate: '--validate',
  }, process.argv, 2
);
const valuesFromCLI = (options, parseds) => {
  const keys = Object.keys(options);
  keys.forEach((elem) => {
    if (parseds[elem]) {
      options[elem] = parseds[elem];
    }
  });
  return options;
};

const newOptions = valuesFromCLI(option, parsed);

mdLinks(newOptions).then((response) => {
  console.log(response);
}).catch((error) => {
  console.log(error);
});
