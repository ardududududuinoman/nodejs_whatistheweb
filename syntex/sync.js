var fs = require('fs')

console.log('a');
var resurt = fs.readFileSync("symtax/smaple.txt",'utf-8')
console.log(resurt);
console.log('c');


console.log('a');
var resurt = fs.readFile("symtax/smaple.txt",'utf-8', function (err,description) {
    console.log(description);
})
