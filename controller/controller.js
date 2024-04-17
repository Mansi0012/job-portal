const express = require ('express');
const router=express.Router();
const multer= require('multer');
var cookieParser= require("cookie-parser");
var session= require("express-session");  
var bcrypt = require("bcrypt");

var register=require("../model/register_schema");
var contact=require('../model/contact_schema');
var addcompany=require('../model/addcompany_schema');

 
 //for session and cookies
router.use(cookieParser());
router.use(
    session({
        key: "user_sid",
        secret: "somerandomstuffs",
        resave: false,
        saveUninitialized: false,
        cookie:{
            expires: 600000, 
        },
    })
)




router.get("/",async(req,res)=>{
    try{
        const compdata= await addcompany.find({});
        res.render('index',{compdata: compdata});
        console.log(compdata);
    }
    catch(err){
        console.log(err);
    }
});
router.get('/contact',(req,res)=>{
    res.render('contact');
})
router.get('/login',(req,res)=>{
    res.render('login');
})

router.get('/register',(req,res)=>{
    res.render('register');
})



//more company single page show api
router.get("/morecompany/:id",async(req,res)=>{
    try{
        const compdata=await addcompany.findById(req.params.id);
        res.render('company',{compdata:compdata});
    }
    catch(err){
        console.log(err);
    }
});

//register post api
router.post('/register',(req,res)=>{
    var user= new register({
        fullName:req.body.fullName,
        email: req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    });
    user.save().then(()=>{
        console.log("saved data");
    })

    .catch((err)=>{
        console.log(err);
    })
});

//login page api
router.post('/login',async(req,res)=>{
    var email =req.body.email,
    password=req.body.password;
    try{
        const login=await register.findOne({email:email});
        console.log(login);
        if(!login){
            res.redirect('/login');
            
        }
        login.comparePassword(password,(error,match)=>{
            if(!match){
                res.redirect("/login");
            }
        });
            req.session.user = login; 
            res.redirect('/dashboard');
}
    catch(error){
        console.log(error);
    }
});

router.post('/contact',(req,res)=>{
    var user2= new contact({
        yourname:req.body.yourname,
        email:req.body.email,
        Number:req.body.Number,
        Message:req.body.Message
    });
    user2.save().then(()=>{
        console.log("saved data");
    })
    .catch((err)=>{
        console.log(err);
    })
});

//******************dashboard apis****************//

router.get('/dashboard',async(req,res)=>{
    if(req.session.user && req.cookies.user_sid){
        var user= req.session.user;

      res.render("dashboard/index");
 }
});
//********logout api*************//
router.get('/logout',(req,res,next)=>{
    if(req.session){
        req.session.destroy(function(error){
            if(error){
                return next(error);
            }
            else{
                return res.redirect('/login')
            }
        })
    }
})


//**add companies**//
router.get('/addcompanies', async(req,res)=>{
    if (req.session.user && req.cookies.user_sid) {
    res.render('dashboard/addcompanies');
    }
    else{
        res.redirect('/login');
    }
});
//file upload at add companies

const storage= multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './upload');
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }


});
const fileFilter =(req,file,cb)=>{
    const allowedFileTypes=['image/jpeg','image/jpg','image/png','image/webp','text/html'];
 
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(null,false);

}
};
const maxsize=1024;
let upload=multer({storage,fileFilter,limits:{fileSize: maxsize}});

//** post api of addcompanies */
router.post('/addcompanies',upload.single('image'),(req,res)=>{
var user3= new addcompany({
    companyName:req.body.companyName,
    email:req.body.email,
    Number:req.body.Number,
    Location:req.body.Location,
    image:req.file.filename
});
user3.save().then(()=>{
    console.log("saved addcompany data")
})

.catch((error)=>{
    console.log(err)
})
res.redirect('/viewcompanies');
});

//view register api
 router.get("/viewregistration",async(req,res)=>{
    if (req.session.user && req.cookies.user_sid) {
    try{
        const regdata= await register.find({});
        res.render('dashboard/viewregistration',{regdata:regdata});
        console.log(regdata);
    }
    catch(err){
        console.log(err);
    }}
    else{
        res.redirect('/login');
    }

 });
 //register delete api
 router.get("/delete_1/:id",async(req,res)=>{
    try{
        const regdata = await register.findByIdAndDelete(req.params.id);
        console.log(regdata);
        res.redirect('/viewregistration');
    }
    catch(err){
        console.log(err);
    }
});

//******  contact us api *******//
router.get("/contactus",async(req,res)=>{
    if (req.session.user && req.cookies.user_sid) {
    try{
        const contdata= await contact.find({});
        res.render('dashboard/contactus',{contdata: contdata});
        console.log(contdata);
    }
    catch(err){
        console.log(err);
    }}
    else{
        res.redirect('/login');
    }
});

//contact delete api
router.get("/delete_3/:id",async(req,res)=>{
    try{
        const contdata = await contact.findByIdAndDelete(req.params.id);
        console.log(contdata);
        res.redirect('/contactus');
    } 
    catch(err){
        console.log(err);
    }
    
});
//view companies api
router.get("/viewcompanies",async(req,res)=>{
    if (req.session.user && req.cookies.user_sid) {
    try{
        const compdata= await addcompany.find({});
        res.render('dashboard/viewcompanies',{compdata: compdata});
        console.log(compdata);
    }
    catch(err){
        console.log(err);
    }}
    else{
        res.redirect('/login');
    }
});
// viewcompanies delete  api
router.get("/delete_2/:id",async(req,res)=>{
    try{
        const compdata = await addcompany.findByIdAndDelete(req.params.id);
        console.log(compdata);
        res.redirect('/viewcompanies');
    }
    catch(err){
        console.log(err);
    }
});
//edit api
router.get('/edit/:id',async(req,res)=>{
    try{
        const regdata = await register.findById(req.params.id);
        res.render('dashboard/editregister',{regdata: regdata});
        console.log(regdata);
    }
    catch(err){
        console.log(err);
    }
});
//update edit or post api of edit
router.post('/edit/:id',async(req,res)=>{
    const itemId =req.params.id;
    const updatedData ={
        fullName:req.body.fullName,
        email: req.body.email,
        password:req.body.password,
        confirmPassword:req.body.confirmPassword
    };
    try{
        const updatedItem=await register.findByIdAndUpdate(itemId,updatedData,{new:true});
        
        console.log(updatedItem);
        
        if(!updatedItem){
            return res.status(404).json({message: 'data not find'});

        }
        res.redirect('/viewregistration');
     }
    catch(err){
        res.status(500).json({ message:'server error'});
    }
    
});

//*****edit api of add companies*******//

router.get('/edit2/:id',async(req,res)=>{
    try{
        const compdata = await addcompany.findById(req.params.id);
        res.render('dashboard/editcompanies',{compdata: compdata});
        console.log(compdata);
    }
    catch(err){
        console.log(err);
    }
});

//*****************update edit or post api of edit***********//
router.post('/edit2/:id',async(req,res)=>{
    const itemId =req.params.id;
    const updatedData ={
        companyName:req.body.companyName,
        email:req.body.email,
        Number:req.body.Number,
        Location:req.body.Location,
        image:req.body.image
    
    
    };
    try{
        const updatedItem=await addcompany.findByIdAndUpdate(itemId,updatedData,{new:true});
        
        console.log(updatedItem);
        
        if(!updatedItem){
            return res.status(404).json({message: 'data not find'});

        }
        res.redirect('/viewcompanies');
     }
    catch(err){
        res.status(500).json({ message:'server error'});
    }


});
module.exports=router;