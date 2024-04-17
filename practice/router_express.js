
var express=require('express');
var app = express();

const router = express.Router();
app.get('/',function(req,res){
    res.send("hello nodejs");
    // res.sendFile(__dirname+"/landing_page.html");

})
router.get('/about_us',function(req,res)
{
res.sendFile(__dirname+"/about_us.html");
})
app.use('/',router);
app.listen(5400)