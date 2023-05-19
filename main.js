var http = require('http');                                               //http모듈을 로드한다
var fs = require('fs');                                                   //fs모듈을 로드한다
var urlModule = require('url');                                           //url모듈을 로드한다

var app = http.createServer(function(request,response){                   //http모듈의 creatserver 메소드로 서버를 구성한다 
  var url = request.url;                                                //url 변수에 url을 받는다
  var querydata = urlModule.parse(url, true).query;                     //querrydata 변수에 쿼리스트링 오브젝트를 받아온다
  console.log("querydata.id : "+querydata.id)                           //querrydata 오브젝트에서 key값이 id인 정보를 로그에 남긴다(id는 오브젝트이다)
  console.log("url:"+url);                                              //url 변수값을 로그에 남긴다
  var title = querydata.id;                                             //title변수에 id오브젝트를 대입한다

  
  if(url == '/'){                                                       //만약 url이 없다면 
    url = '/?id=hello';                                                 //url에 hello를 대입한다
    var description = 'hello world'                                     //description 에 hello 출력
  }



  if(url == '/favicon.ico'){                                            //만약 url이 favicon.icon이라면
    return response.writeHead(404);                                     //404페이지를 출력한다========================OR======================
  }                                                                     //만약 url이 favicon.ico가 아니라면
  response.writeHead(200);                                              //200페이지를 출력한다
  fs.readdir('./data',function(params,filelist) {                       //data 폴더의 파일리스트를 filelist에 array타입으로 저장한다
    var list = (                                                        //list를 선언한다
      '<ul>'                                                            //ul html을 생성한다
    )            
    
    

    filelist.forEach(filelist => {                                       //filelist 를 element로 forRach 를 실행
      list = list + `<li><a href="/?id=${filelist}>${filelist}</a></li>` //<ul> html을 부모로하고 filelist를 출력하는 <list><a> html 생성
    });
    var list = list+'</ul>'                                              //<ul> html를 닫는다
  }
  )
  //   var lsit =<ul>
  //   <li><a href="/?id=HTML">HTML</a></li>
  //   <li><a href="/?id=CSS">CSS</a></li>
  //   <li><a href="/?id=JAVASCRIPT">JavaScript</a></li>
  // </ul>


    var template = `
  <!doctype html>
  <html>
  <head>
    <title calss='font-cafe24'>WEB1 - ${title}</title>
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
    <p style="margin-top:45px;">${description}</p>
    <script><
  </body>
  </html>
  `
  response.end(template);

  });
    
app.listen(3000);