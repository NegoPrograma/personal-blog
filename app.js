
// Setando os modules necessários pro projeto.

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("mongoose");

// Configurando os módulos para funcionar do jeito desejado

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Configurando o link do DB, utilizando o login e password de um user criado no MongoDB-Atlas

db.connect("mongodb+srv://<login>:<password>@cluster0-vyins.mongodb.net/DBName",{useNewUrlParser: true});

/*

Setando o Schema e o Model.
Pra facilitar o entendimento, pensa que o Schema é uma classe (ou uma table do SQL), e que o Model é a instanciação dessa classe, é pelo model que vc chama as funções do DB

*/


const postSchema = {
  postTitle: {
    type: String,
    required: [true]
  },
  postText: {
    type: String,
    required: [true]
  }
};

const postModel = db.model("Post",postSchema);

// Configurando o comportamento dos caminhos

app.get("/",(req,res)=>{
  res.redirect("/home");
});

app.get("/home",(req,res)=>{
  postModel.find({},(error,results)=>{
  res.render("home",{posts: results});

  });

});

app.get("/posts/:post",(req,res)=>{
  postModel.findOne({_id: req.params.post},(err,result)=>{
    res.render("unique_post",{ post: result});
  });
});


app.get("/contact",(req,res)=>{
  res.render("contact");
  
  
});
app.get("/about",(req,res)=>{
  res.render("about");
});


//criando posts

app.get("/newpost",(req,res)=>{
  res.render("newpost");

});


app.post("/newpost",(req,res)=>{ 

  const post = new postModel({
            postTitle: req.body.Title,
            postText: req.body.Text
  });
  post.save();
  res.redirect("/home");
});
  
//atualizando posts

app.get("/refresh/:postId",(req,res)=>{
  postModel.findOne({_id: req.params.postId},(error,result)=>{
    res.render("refresh",{post:result});
  });
});

app.post("/refresh/:postId",(req,res)=>{

  postModel.findOneAndUpdate({_id:req.params.postId},{postTitle:req.body.postTitle,postText:req.body.postText},(error)=>{
    console.log(error);
  });

  res.redirect("/home");
});

//deletando posts

app.get("/delete/:postId",(req,res)=>{

  postModel.deleteOne({_id:req.params.postId},(error)=>{
    console.log(error);
    
  });
  res.redirect("/home");


});



// process.env.PORT é pra deixar o heroku escolher o caminho que quiser

app.listen( process.env.PORT || 3002, function() {
  console.log("Server started on port 3002");
});
