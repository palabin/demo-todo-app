var express = require("express");
var app = express();
var bodyParse = require("body-parser");
var mongoose = require("mongoose");

//mongodb connection
mongoose.connect("mongodb://localhost/todo");

//view engine for ejs file
app.set("view engine", "ejs");

//bodyparser for extracting data form ejs pages
app.use(bodyParse.urlencoded({extended: true}));


//mogoose schema
var todoSchema = new mongoose.Schema({
    task: String
});

var todo = mongoose.model("Todo", todoSchema);

//======Express routes Here!============//

app.get("/", function(req, res) {
    todo.find({}, function(err, todoList) {
        if(err) console.log(err);
        else {
            res.render("index.ejs", {todoList: todoList});
        }
    });    
});

//add new todo item to list
app.post("/newtodo", function(req, res) {
    console.log(req.body.item);
    var newTodo = new todo({
        task: req.body.item
    });
    todo.create(newTodo, function(err, todo) {
        if(err) console.log(err);
        else {
            console.log("Insert: " + newTodo);
        }
    });
    res.redirect("/");
});


//catch all other routes
app.get("*", function(req, res) {
    res.send("Invalid page");
});


//express server
app.listen(3000, function() {
    console.log("Server started port 3000");
});
