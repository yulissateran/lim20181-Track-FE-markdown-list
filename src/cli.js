#!/usr/bin/env node
const mdLinks = require('./index.js')
const path = require('path');
// const [, , ...args] = process.argv;
const args = process.argv[2];
const absolutePath = path.resolve(args);
console.log(absolutePath);

mdLinks(absolutePath);