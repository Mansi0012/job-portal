var http=require('http');
http.createServer(function(req,res){
    res.write("<h1>http module</h1>");
    res.write("hello from node jc server<br>");
    res.write("hello mansi from node js");
    res.end();
}).listen(1234)