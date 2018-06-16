var mongoose=require("mongoose");

var contentSchema=new mongoose.Schema({
    image:String,
    paragraph:String,
    tag:String,
});

module.exports=mongoose.model("vcontents",contentSchema);