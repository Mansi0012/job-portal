var mongoose=require('../database/config')
var mongoose=require('mongoose')

const userSchema= mongoose.Schema({
    yourname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    Number:{
        type:Number,
        require:true
    },
    Message:{
        type:String,
        require:true
    }

})
const userModel = mongoose.model('contact',userSchema)
module.exports = userModel