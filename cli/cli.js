#!/usr/bin/env node
const nopt = require('nopt');
const path = require('path');
const mdLinks = require('../lib/index.js');

const route = process.argv[2];
const option = {
  validate: false,
  state: false,
};
const parsed = nopt(
  {
    validate: Boolean,
    state: Boolean,
  },
  {
    state: '--state',
    validate: '--validate',
  }, process.argv, 3
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
console.log(route,   newOptions)
mdLinks(route, newOptions).then((response) => {
  if (typeof response === 'object') {
    response.forEach((elem) => {
      process.stdout.write(`${elem.href} | ${elem.text} | ${elem.state || ''} | ${elem.path} \n`);
    });
  }else{
    process.stdout.write(response);
  }
}).catch((error) => {
  console.log('error', error);
});
