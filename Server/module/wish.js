const mongoose = require ('mongoose')

const WishSchema = new mongoose.Schema({
    itemName:String,
    description:String,
    link:String,
    priority:String,
    createdAt:String
})
const WishModel = mongoose.model("wishs", WishSchema)
module.exports = WishModel