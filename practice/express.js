const express=require('express');
const app=express();
app.get('/',function(req,res)
{
    res.send("hello world");   
})
app.get('/aboutus',function(req,res)
{
    res.send("hello about us");

})
app.listen(4900)