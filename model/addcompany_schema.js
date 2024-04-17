var mongoose=require('../database/config')
var mongoose=require('mongoose')
 
const companySchema= mongoose.Schema({
    companyName:{
        type:String,
        require:true

    },
    email:{
        type:String,
        require:true
    },

Location:{
    type:String,
    require:true

},
Number:{
    type:Number,
    require:true
},
image:{
    type:String,
    require:true
}
})
const addcompanies = mongoose.model('addcompany',companySchema)
module.exports = addcompanies