// var http=require('http');
// var fs=require('fs');
// http.createServer(function(req,res){
//     fs.readFile('demo.html',function(err,data){
//         res.writeHead(200,{'content-type':'text/html'});
//         res.write(data);
//         return res.end();
//     })
// }).listen(1244)
// var fs = require('fs');

// //create a file named mynewfile1.txt:
// fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });
/*fs.open('mynewfile2.txt', 'w', function (err, file) {
    if (err) throw err;
    console.log('Saved!');
  });*/
// //create a file named mynewfile1.txt:
 fs.appendFile('mynewfile1.txt', 'Hello content!', function (err,file) {
  if (err) throw err;
 console.log('Saved!');
});
// var fs =require('fs');
//  fs.rename('mynewfile1.txt', function (err) {
//    if (err) throw err;
//    console.log('file deleted!');
//   });

