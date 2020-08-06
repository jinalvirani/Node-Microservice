const mongoose = require('mongoose');
const BookSchema = mongoose.Schema({
    BookName: {type:String, require:true},
    Author: {type:String, require:true},
    Price: {type:Number, require:true}
});

const BookMdl = mongoose.model("Booktb", BookSchema);
module.exports = {Booktb: BookMdl};
