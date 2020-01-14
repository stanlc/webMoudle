const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    roleName:{type:String},
    roleDesc:{type:String},
    createTime:{type:String}
})

module.exports = mongoose.model('Role',schema)