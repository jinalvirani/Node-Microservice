const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const {Ordertb} = require('./OrderModel');
const axios = require('axios');
const app = express();
app.use(bodyParser.json())
const con  = "mongodb+srv://jinal:jinal@realmcluster.7f7dv.mongodb.net/noshdb?retryWrites=true&w=majority";

mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
    console.log("connected");
}).catch((err) => {
    console.log(err);
});


app.get("/allorders", (req,res) =>{
    mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        Ordertb.find()
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

app.get("/allorders/:id", (req,res) =>{
    mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        const id = req.params.id;
        Ordertb.findById(id)
        .then((obj) => {
            var orderobj = {
                OrderId: obj._id,
                BookName: "",
                Author : "",
                Price: "",
                customerName: "",
                Email: ""
            }
            axios.get("http://localhost:4444/books/" + obj.BookId)
            .then((bookres) => {        
                orderobj.BookName = bookres.data.BookName;
                orderobj.Author = bookres.data.Author;
                orderobj.Price = bookres.data.Price;

                axios.get("http://localhost:5555/customer/" + obj.CustomerId)
                .then((custres) => {
                    orderobj.customerName= custres.data.customerName;
                    orderobj.Email = custres.data.Email;
                    res.status(200).json(orderobj);
                })
                .catch((custerr) => {
                    console.log("customer err");
                    res.status(409).json(custerr);
                });
            }).catch((err) => {
                console.log(err);
                res.status(409).json(err);
            });
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

app.post("/orderbook", (req,res) =>{
    mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log(req);
        const order = new Ordertb({
            CustomerId: req.body.CustomerId,
            BookId: req.body.BookId,
            IssueDate: req.body.IssueDate,
            ReturnDate:req.body.ReturnDate
        });
        order.save()
        .then((custobj) => {
            console.log("Order Placed");
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

app.listen(4445, () =>{
    console.log("app is running");
});