#!/usr/bin/env node
const nopt = require('nopt');
const path = require('path');
const mdLinks = require('../lib/index.js');

const route = process.argv[2];
const option = {
  validate: false,
  stats: false,
};
const parsed = nopt(
  {
    validate: Boolean,
    stats: Boolean,
  },
  {
    stats: '--stats',
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
mdLinks(route, newOptions).then((response) => {
  if (typeof response === 'object') {
    response.forEach((elem) => {
      process.stdout.write(` ${elem.path}  ${elem.href}  ${elem.text}  ${elem.state || ''}  \n`);
    });
  }else{
    process.stdout.write(response);
  }
}).catch((error) => {
  console.log('error', error);
});
