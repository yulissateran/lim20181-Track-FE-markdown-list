const nopt = require('nopt');
const fs = require('fs');
const path = require('path');
const option = {
  state: false,
  validate: false,
  path: __dirname
};
const parsed = nopt(
  {
    'validate': Boolean,
    'state': Boolean,
    'path': path
  },
  {
    's': '--state',
    'v': '--validate',
    'p': '--path'
  }, process.argv, 2);
const valuesFromCLI = (option, parsed) => {
  console.log(parsed);
  for (let prop in option) {
    if (parsed[prop] !== undefined) option[prop] = parsed[prop];
  }
};
console.log(option);
valuesFromCLI(option, parsed);

