#!/usr/bin/env node
const markdownLinks = require('./index.js');
const mdLinks = markdownLinks.mdLinks;
const path = require('path');
// const [, , ...args] = process.argv;
const args = process.argv[2];
const absolutePath = args;


mdLinks(absolutePath).then((response)=>{
console.log(response);
}).catch((error)=>{
  console.log(error);
});