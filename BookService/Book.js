const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const {Booktb} = require('./BookModel');
const app = express();
app.use(bodyParser.json())
const con  = "mongodb+srv://jinal:jinal@realmcluster.7f7dv.mongodb.net/noshdb?retryWrites=true&w=majority";
 mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log("connected");
}).catch((err) => {
    console.log(err);
})
app.get("/books", (req,res) =>{
    mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        Booktb.find()
        .then((obj) => {
            console.log(obj);
            res.status(200).json(obj);
        })
        .catch((err) => {
            console.log("fetch err");
            res.status(409).json(err);
        });  
    })
    .catch((dberr) => {
        console.log("database error");
        res.status(500).json({"msg": "database error"})
    });      
});

app.post("/addbook", (req,res) =>{
    mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("connected");
        console.log(req);
        const Book = new Booktb({
            BookName: req.body.BookName,
            Author:req.body.Author, 
            Price: req.body.Price,
        });
        Book.save()
        .then((bookobj) => {
            console.log("Book added");
            res.status(200).json(bookobj);        
        })
        .catch((err) => {
            console.log("insert err");
            res.status(409).json(err);
        });
    }).catch((dberr) =>{
        console.log("database error");
        res.status(500).json({"msg": "database error"})
    });
});


app.get("/books/:id", (req,res) =>{
    mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        const id = req.params.id;
        Booktb.findById(id)
        .then((obj) => {
            console.log(obj);
            res.status(200).json(obj);
        })
        .catch((err) => {
            console.log("find err");
            res.status(409).json(err);
        })
    })
    .catch((dberr) => {
        console.log("database error");
        res.status(500).json({"msg": "database error"})
    })
});
app.delete("/deletebook/:id", (req,res) =>{
    mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        const id = req.params.id;
        Booktb.findByIdAndDelete(id)
        .then((obj) => {
            console.log(obj);
            res.status(200).json(obj);
        })
        .catch((err) => {
            console.log("delete err");
            res.status(409).json(err);
        })
    })
    .catch((dberr) => {
        console.log("database error");
        res.status(500).json({"msg": "database error"})
    })
});
app.listen(4444, () =>{
    console.log("app is running");
});