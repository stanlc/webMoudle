const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userName:{type:String},
    logName:{type:String},
    roleName:{type:String},
    phone:{type:String},
    email:{type:String},
    organName:{type:String},
    createTime:{type:String}
})

module.exports = mongoose.model('User',schema)