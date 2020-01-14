const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    nickName:{type:String},
    status:{type:String},
    mac:{type:String},
    organ:{type:String},
    address:{type:String},
})

module.exports = mongoose.model('Device',schema)