var express=require('express');
const bodyParser = require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

// router.get('/',(req,res)=>{
//     res.render('index');
// })
app.use(express.static('views'));
app.use(express.static('upload'));
 

const router=require("./controller/controller");

app.use('/',router);
app.listen(4500);
