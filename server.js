var express = require("express");
var path = require("path");
var app = express();
var PORT = 3006 || process.env.PORT;
var fs = require('fs');
var notesJSON = require('./db/db.json');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
let notes = {};

app.get("/notes",function(req,res){
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.get("*",function(req, res){
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes",function(req,res){
  let noteMap = notesJSON.map((item)=>{
         return item.title;
         })
   res.parse(noteMap);
});
app.post("/api/notes",function(req,res){
  var newNote = req.body;
  notesJSON.push(newNote);
  fs.readFile("./db/db.json","utf8",(err,data)=>{
    notes = data;
    });
   res.json(newNote);
    var noteMap = notesJSON.map((item)=>{
        return item.title;
    });
    console.log(Array.from(noteMap));
  //fs.writeFile('./db/db.json',notes,(err)=>{if(err)throw err;});
});


app.listen(PORT, function(){
  console.log("App listening on PORT " + PORT);
});