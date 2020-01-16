var http = require('http');
// 서버를 만듦
/* 
   http.createServer( 출력할 내용 )
   함수형 프로그래밍: 서버가 할 일을 함수 형태로 만들어 매개변수로 집어넣음
   함수는 내가 만들었으나 시스템이 필요할 때 알아서 사용함 → 콜백 함수
   요청이 들어왔을 때 수행할 기능을 function handler에 작성
   handler는 어떤 특정 상황에 발생되는 콜백 함수이므로 Event Handler이다.
   
   req: 사용자가 요청한 요청 정보
   res: 서버에서 만드는 응답 정보
*/
http.createServer(function handler(req, res) {
    res.writeHead (200, {'Content-type': 'text/html'});
    res.write('<h1>Server Test</h1>');
    res.end('Hello world!');
}).listen(1337, '127.0.0.1'); // listen(포트번호, 주소): 주소와 포트번호로 클라이언트 요청받게 듣고 있음
console.log('Server running at http://127.0.0.1:1337'); // or http://localhost:1337