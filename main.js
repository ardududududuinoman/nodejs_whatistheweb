//모듈로드
var http = require('http');                                               //http모듈을 로드한다
var fs = require('fs');                                                   //fs모듈을 로드한다
var urlModule = require('url');                                           //url모듈을 로드한다
var app = http.createServer(function(request,response){                   //http모듈의 creatserver 메소드로 서버를 구성한다 
  var url = request.url;                                                //url 변수에 url을 받는다
  var querydata = urlModule.parse(url, true).query; 
  var pathname = urlModule .parse(url, true).pathname;                    //querrydata 변수에 쿼리스트링 오브젝트를 반환한다
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
        var list = '<ul>';                                                //변수lists에 <ul> 저장
        filelist.forEach(filelist => {                                       //filelist 를 element로 forRach 를 실행
          list = list + `<li><a href="/?id=${filelist}>${filelist}</a></li>` //<ul> html을 부모로하고 filelist를 출력하는 <list><a> html 생성
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
        var list = '<ul>';                                                //변수lists에 <ul> 저장
        filelist.forEach(filelist => {                                       //filelist 를 element로 forRach 를 실행
          list = list + `<li><a href="/?id=${filelist}>${filelist}</a></li>` //<ul> html을 부모로하고 filelist를 출력하는 <list><a> html 생성
        }
        )
        fs.readFile(`./data/${title}`,'utf-8',function (err,description) {
        var template = createtemplate(title,list,description)
        response.write(200)
        response.end(template)
        }
        )
      })
    }                                                       //만약 url이 없다면 
  }

  console.log("querydata.id : "+querydata.id)                           //querrydata 오브젝트에서 key값이 id인 정보를 로그에 남긴다(id는 오브젝트이다)
  console.log("url:"+url);                                              //url 변수값을 로그에 남긴다



  //처음접속했을떄


  //이상한url에 접속했을때
  if(url == '/favicon.ico'){                                            //만약 url이 favicon.icon이라면
    return response.writeHead(404);                                     //Not Found========================OR======================
  }                                                                     //만약 url이 favicon.ico가 아니라면
  

  //정상url 접속했을때
  response.writeHead(200);                                              //정상신호
  fs.readdir('./data',function(params,filelist) {                       //블록변수 filelist에 data폴터의 dir을 array형식으로 저장한다
    var list = ('<ul>');                                                //변수lists에 <ul> 저장
    filelist.forEach(filelist => {                                       //filelist 를 element로 forRach 를 실행
      list = list + `<li><a href="/?id=${filelist}>${filelist}</a></li>` //<ul> html을 부모로하고 filelist를 출력하는 <list><a> html 생성
    }
    );
    var list = list+'</ul>'                                              //<ul> html를 닫는다
    fs.readFile(`data/$${title}`,'utf-8',function (err,data) {
    let description = data

    
    response.end(template);
  
    });
      
  

    })
  }
  )
  app.listen(3000);