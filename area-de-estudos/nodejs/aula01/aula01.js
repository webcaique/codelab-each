const http = require('http');

http.createServer((req,res)=>{
    res.writeHead(200, {
        'Content-Type':'text/plain'
    });

    res.write("A thing")
    res.end();
}).listen(8000)