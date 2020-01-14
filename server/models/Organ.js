const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    organName:{type:String},
    organDesc:{type:String},
    organPerson:{type:String},
    phone:{type:String},
    longitude:{type:String},
    latitude:{type:String},
    parent:{type:String}
})

module.exports = mongoose.model('Organ',schema)