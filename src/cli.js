#!/usr/bin/env node
import nopt from 'nopt';
import mdLinks from 'index.js';
// const [, , ...args] = process.argv;
const args = process.argv[2];
const absolutePath = args;
const option = {
  state: false,
  validate: false,
  path: __dirname
};
const parsed = nopt(
  {
    'validate': Boolean,
    'state': Boolean,
  },
  {
    's': '--state',
    'v': '--validate'
  }, process.argv, 3);
const valuesFromCLI = (option, parsed) => {
  console.log(parsed);
  for (let prop in option) {
    if (parsed[prop] !== undefined) option[prop] = parsed[prop];
  }
};
console.log(option);
valuesFromCLI(option, parsed);


// mdLinks(absolutePath).then((response) => {
//   console.log(response);
// }).catch((error) => {
//   console.log(error);
// });