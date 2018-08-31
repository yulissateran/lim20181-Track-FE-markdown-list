#!/usr/bin/env node
const nopt = require('nopt');
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
  const keysOptions = Object.keys(options);
  keysOptions.forEach((elem) => {
    if (parseds[elem]) options[elem] = parseds[elem];
  });
  return options;
};

const optionsFromCli = valuesFromCLI(option, parsed);

mdLinks(route, optionsFromCli).then((response) => {
  if (typeof response === 'object' && response.length) {
    response.forEach((elem) => {
      if (elem.path) process.stdout.write(`${elem.path}  ${elem.href}  ${elem.text}  ${elem.status || ''}  \n`);
      else if (elem.broken) process.stdout.write(`\n total: ${elem.total} | uniques: ${elem.unique} | broken: ${elem.broken}`);
      else process.stdout.write(`\n total: ${elem.total} | uniques: ${elem.unique} `);
    });
    process.exit();
    /* eslint-disable-next-line no-console */
  } else console.log(response);
/* eslint-disable-next-line no-console */
}).catch(err => console.log(err));
