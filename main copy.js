//모듈로드
var http = require('http');                                            
var fs = require('fs');                                                
var urlModule = require('url');                                        
var app = http.createServer(function(request,response){                
  var url = request.url;                                               
  var querydata = urlModule.parse(url, true).query;
  var pathname = urlModule .parse(url, true).pathname;                 
  var title = url.id;
  function createtemplate(title,list,description) {
    return `
    <!doctype html>
    <html>
    <head>
      <title calss='font-cafe24'>${title}</title>
      <meta charset="utf-8">
      <link rel="stylesheet" href="font.css">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
        ${list}
      <h2>${title}</h2>
      <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a>is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
      <img src="coding.jpg" width="100%">
      </p>
      <h1>${title}</h1>
      <p style="margin-top:45px;">${description}</p>
      <script><
    </body>
    </html>
    `
  }

  if(pathname == '/'){
    if (querydata === undefined) {

      fs.readdir('./data',function (err,filelist) {
        var list = '<ul>';                                                
        filelist.forEach(filelist => {                                       
          list = list + `<li><a href="/?id=${filelist}>${filelist}</a></li>` 
        }
        );
        var list = list+'</ul>'
        var title = 'hello Pathname'
        var description = 'this description is pathname'
        var template = createtemplate(title,list,description)
        response.writeHead(200)
        response.end(template)
      }
      )
    } else {
      fs.readdir('./data', function(err,filelist) {
        var title = 'helloWorld if not pathname/'
        var description = 'if not pathname/'
        var list = '<ul>';                                                
        filelist.forEach(filelist => {                                       
          list = list + `<li><a href="/?id=${filelist}>${filelist}</a></li>` 
        }
        )
        fs.readFile(`./data/${title}`,'utf-8',function (err,description) {
        var template = createtemplate(title,list,description)
        response.writeHead(200)
        response.end(template)
        }
        )
      })
    }                                                       
  }

  console.log("querydata.id : "+querydata.id)                           
  console.log("url:"+url);                                             



 


 
  if(url == '/favicon.ico'){                                           
    return response.writeHead(404);                                     
  }                                                                    
  

 
  response.writeHead(200);                                              
  fs.readdir('./data',function(params,filelist) {                       
    var list = ('<ul>');                                                
    filelist.forEach(filelist => {                                       
      list = list + `<li><a href="/?id=${filelist}>${filelist}</a></li>` 
    }
    );
    var list = list+'</ul>'                                              
    fs.readFile(`data/$${title}`,'utf-8',function (err,data) {
    let description = data

    
    response.end(template);
  
    });
      
  

    })
  }
  )
  app.listen(3000);