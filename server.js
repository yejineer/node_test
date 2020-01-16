/* 2020-01-16 THU Node.js 기초 2
    - 프로토콜://서버 주소:포트번호/폴더/파일명?쿼리*
    - 쓰기  Create   POST
      읽기  Read     GET
      수정  Update   UPDATE
      삭제  Delete   DEL
*/

// /*
//     1. File System 모듈의 사용
//     - html 응답 결과를 직접 코드로 작성하지 않고 html페이지로 대체
// */
// var http = require('http');
// var fs = require('fs');
// http.createServer(function (reqquest, response) {
//     // HTML 파일을 읽어 응답 만들기
//     fs.readFile('./html/test_res.html', function(error, data) {
//         if (error) {
//             console.log(error.message);
//         } else {
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.end(data);
//         }
//     });
// }).listen(1234, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1234');

// /*
//     2. 이미지 파일 사용
//         - 서버의 응답 결과로 이미지 제공 (./img/이미지파일명 준비)
//         - MIME형식: text/plain, text/html, text/css, text/xml, image/jpeg, image/png, video/mpeg, audio/mp3
// */
// var http = require('http');
// var fs = require('fs');
// http.createServer(function (reqquest, response) {
//     // img 파일을 읽어 응답 만들기
//     fs.readFile('./img/puppy.jpg', function(error, data) {
//         if (error) { console.log(error.message); } else {
//             response.writeHead(200, {'Content-Type': 'image/jpeg'});
//             response.end(data);
//         }
//     });
// }).listen(1234, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1234');

// /*
//     3. 페이지 이동
//         - 서버에 접속할 때 특정 페이지로 이동
// */
// var http = require('http');
// http.createServer(function (reqquest, response) {
//     response.writeHead(302, {'Location': 'https://cs.dongduk.ac.kr'});
//     response.end();
// }).listen(1234, function() {
//     console.log('Server running at http://127.0.0.1:1234');    
// });

// /*
//     4. 다양한 페이지 접근
//         - 접속한 url을 분석하여 서로 다른 결과를 클라이언트에게 전송
// */
// var http = require('http');
// var url_m = require('url');
// var fs = require('fs');

// http.createServer(function (request, response) {
//     var pathName = url_m.parse(request.url).pathname;
//     if (pathName == '/') {
//         fs.readFile('./html/index.html', function(error, data) {
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.end(data);
//         });
//     } else if (pathName == '/second') {
//         fs.readFile('./html/second.html', function (error, data) {
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.end(data);
//         });
//     } else if (pathName == '/cs') {
//         response.writeHead(302, {'Location': 'https://cs.dongduk.ac.kr'});
//         response.end();
//     }
// }).listen(1234, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1234');


/*
    5. Method (GET/POST) 속성 구분
        - 5-1) GET 방식의 클라이언트 요청을 확인하기
*/
// var http = require('http');
// var url = require('url');
// var querystring = require('querystring');

// http.createServer(function (request, response) {
//     var query = url.parse(request.url, true).query;
//     response.writeHead(200, {'Content-Type': 'text/html'});
//     response.end('<h1>' + JSON.stringify(query) + '</h1>');
// }).listen(1234, function() {
//     console.log('Server running at http://127.0.0.1:1234');
// });
/*
    5. Method (GET/POST) 속성 구분
        - 5-2) GET 방식으로 요청받은 페이지를 전송한 후 POST 요청 처리
*/
// var http = require('http');
// var fs = require('fs');
// var querystring = require('querystring');

// http.createServer(function (request, response) {
//     if (request.method == 'GET') {
//         fs.readFile('./html/login.html', function (error, data) {
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.end(data);
//         });
//     } else if (request.method == 'POST') {
//         request.on('data', function(data) { // request.on('사건의 이름') → 즉, data가 들어왔을 때 동작하라는 것
//             var text = "";
//             text += data;
//             var parsedStr = querystring.parse(text, '&', '=');
//             console.log(parsedStr.id);
//             console.log(parsedStr.pwd);
//             response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//             response.end('<h1>' + data + '</h1>');
//         });
//     }
// }).listen(1234, function() {
//     console.log('Server running at http://127.0.0.1:1234');
// });

/* 
    실습
    : Login 화면에서 id와 pwd를 같은 문자열로 입력하고 제출할 경우 학과 홈페이지로 이동하고,
      다른 문자열로 입력하였을 경우 '로그인 실패!!!'라고 표시하는 웹페이지(login_failed.html)를 보여주도록 서버를 작성하시오.
*/
var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

http.createServer(function (request, response) {
    if (request.method == 'GET') {
        fs.readFile('./html/login.html', function (error, data) {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(data);
        });
    } else if (request.method == 'POST') {
        request.on('data', function(data) {
            var text = "";
            text += data;
            var parsedStr = querystring.parse(text, '&', '=');
            if (parsedStr.id == parsedStr.pwd) {
                response.writeHead(302, {'Location': 'https://cs.dongduk.ac.kr'});
                response.end();
            } else {
                fs.readFile('./html/login_failed.html', function (Error, data) {
                    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    response.end(data);
                });
            }
        });
        
    }
}).listen(1234, function() {
    console.log('Server running at http://127.0.0.1:1234');
});