var mongoose =require('../database/config')
var mongoose = require('mongoose')
var bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }, 
    password:{
        type:String,
        require:true
    },
    confirmPassword:{
        type:String,
        require:true
    }

})
userSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password= bcrypt.hashSync(this.password,10);
    next();
});
userSchema.methods.comparePassword =function(plaintext,callback){
    return callback(null,bcrypt.compareSync(plaintext,this.password));
};
//confirm password
userSchema.pre("save",function(next){
    if(!this.isModified("confirmPassword")){
        return next();
    }
    this.confirmPassword= bcrypt.hashSync(this.confirmPassword,10);
    next();
});
userSchema.methods.comparePassword =function(plaintext,callback){
    return callback(null,bcrypt.compareSync(plaintext,this.password));
};
const userModel = mongoose.model('register',userSchema)
module.exports = userModel