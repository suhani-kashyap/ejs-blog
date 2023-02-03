const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "To get started click on the Compose Page.";
const aboutContent = "Daily Journal is an easy-to-use tool to journal. It is designed to have a sleek design and focuses on functionality.";
const contactContent = "Email: suhanikashyap081@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];

app.get("/",function(req,res){
  res.render("home",{homeStartingContent: homeStartingContent, posts:posts});
})

app.get("/about",function(req,res){
  res.render("about",{aboutContent: aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{contactContent: contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.get("/posts/:postTitle",function(req,res){
  var postTitle = lodash.lowerCase(req.params.postTitle);
  posts.forEach(function(post){
    if (lodash.lowerCase(post.postTitle)===postTitle){
      res.render("post",{post:post});
    } 
  })
})

app.post("/compose",function(req,res){
  var post = {
    postTitle: req.body.newPostTitle,
    postBody: req.body.newPost
  }
  posts.push(post);
  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
