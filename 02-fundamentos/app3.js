const fs = require('fs');

const content = fs.readFileSync('readme.md', 'utf8');


const wordCount = content.split(' ');

const reactCount = []

// const regex = new RegExp("\\bReact\\b", "ig")
// const result = content.match(regex).length


const result = content.match(/React/ig ?? []).length

console.log('Palabras: ', wordCount);
console.log('Palabras React: ', result);



