// 모듈 로드
var http = require('http');
var fs = require('fs');
var urlModule = require('url');
var app = http.createServer(function (request, response) {
  var url = request.url;
  var querydata = urlModule.parse(url, true).query;
  var pathname = urlModule.parse(url, true).pathname;
  var title = url.id;
  function createtemplate(title, list, description) {
    return `...`; // HTML 소스를 그대로 유지
  }
  
  if (pathname == '/') {
    if (querydata.id === undefined) {
      fs.readdir('./data', function (err, filelist) {
        var list = '<ul>';
        filelist.forEach(filelist => {
          list = list + `<li><a href="/?id=${filelist}>${filelist}</a></li>`;
        });
        list = list + '</ul>';
        var title = 'hello Pathname';
        var description = 'this description is pathname';
        var template = createtemplate(title, list, description);
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir('./data', function (err, filelist) {
        var list = '<ul>';
        filelist.forEach(filelist => {
          list = list + `<li><a href="/?id=${filelist}>${filelist}</a></li>`;
        });
        list = list + '</ul>';
        var title = 'helloWorld if not pathname/';
        fs.readFile(`./data/${querydata.id}`, 'utf-8', function (err, description) {
          var template = createtemplate(title, list, description);
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    response.writeHead(404);
    response.end('Not found');
  }
});
app.listen(3000);
