const mongoose=require('mongoose')

var con = mongoose.connect("mongodb+srv://mansi:korangamansi@cluster0.jj2mgn3.mongodb.net/practice?retryWrites=true&w=majority",
{
    // useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=>console.log("connection successfully.."))
.catch((err)=>console.log(err));

module.exports=con;