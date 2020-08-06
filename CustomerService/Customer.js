const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const {Customertb} = require('./Customermdl');
const app = express();
app.use(bodyParser.json())
const con  = "mongodb+srv://jinal:jinal@realmcluster.7f7dv.mongodb.net/noshdb?retryWrites=true&w=majority";

mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log("connected");
}).catch((err) => {
    console.log(err);
});


app.get("/customer", (req,res) =>{
    mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        Customertb.find()
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

app.post("/addcust", (req,res) =>{
    mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("connected");
        console.log(req);
        const cust = new Customertb({
            CustomerName: req.body.CustomerName,
            Email:req.body.Email
        });
        cust.save()
        .then((custobj) => {
            console.log("Customer added");
            res.status(200).json(custobj);        
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


app.get("/customer/:id", (req,res) =>{
    mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        const id = req.params.id;
        Customertb.findById(id)
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
app.delete("/deletecust/:id", (req,res) =>{
    mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        const id = req.params.id;
        Customertb.findByIdAndDelete(id)
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
app.listen(5555, () =>{
    console.log("app is running");
});