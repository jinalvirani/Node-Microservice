const mongoose = require('mongoose');
const CustomerSchema = mongoose.Schema({
    CustomerName: {type:String, require:true},
    Email: {type:String, require:true}
});

const CustomerMdl = mongoose.model("Customertb", CustomerSchema);
module.exports = {Customertb: CustomerMdl};
