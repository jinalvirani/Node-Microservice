const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const OrderSchema = mongoose.Schema({
    CustomerId: {type: mongoose.Schema.Types.ObjectId, require:true},
    BookId: {type: mongoose.Schema.Types.ObjectId, require:true},
    IssueDate: {type:Date, require:true},
    ReturnDate: {type:Date, require:true}
});

const OrderMdl = mongoose.model("Ordertb", OrderSchema);
module.exports = {Ordertb: OrderMdl};
