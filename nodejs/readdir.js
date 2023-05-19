var testForder = './tests/';
const { log } = require('console');
var fs = require('fs');

fs.readdir(testForder, (err,files) = > {
    files.forEach(element => {
        console.log(element);
    });
})