var express= require("express");
var index=express();
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var mongoose=require("mongoose");
var passport=require("passport");
var localstrategy=require("passport-local");
var content=require("./models/content")

mongoose.connect('mongodb://localhost/vishalnext');
index.use(bodyParser.urlencoded({extended:true}));
index.use(methodOverride("_method"));
index.use(express.static("public"));
index.set("view engine","ejs");



//show page(home page)

index.get("/",function(req,res){
        console.log(req.user);
        content.find({},function(err,newarticles){
        if(err){
            console.log(err);
            
        }
        else
        {
            res.render("content/home",{article:newarticles});
        }
    })
    
});


//show page(contents)

index.get("/show/:id",function(req,res){
    content.findById(req.params.id,function(err,fcontent){
        if(err){
            console.log(err);
        }
        else{
            res.render("content/show",{content:fcontent});
        }
    });
    
});


//newpost

index.get("/newpost",function(req, res) {
   res.render("content/newpost");
});

//newpost(post)
index.post("/newpost",function(req,res){
    var image=req.body.image;
    var paragraph=req.body.paragraph;
    var tag=req.body.tag;
    var newcontent={image:image,paragraph:paragraph,tag:tag};
    content.create(newcontent,function(err,post){
        if(err){
            console.log(err);
        }
        else{
            console.log("added Sucessfully");
            res.redirect("/");
        }
    });
});








index.listen(process.env.PORT,process.env.ID,function(req,res){
    console.log("Server is Started");
}); 
