// Contacts

'use strict'
const mongoose = require('mongoose');
const validation = require('../util/validate');

var contactSchema = new mongoose.Schema({
    contactId:{type:String,required:true},
    firstName:{type:String,required:true,validate:validation.nameValidator},
    familyName: {type: String,validate:validation.nameValidator},
    email: { type: String,validate:validation.emailValidator},
    phoneNumber: {type:String,required:true,validate:validation.phoneValidator},
    createdTime:{type:Date,default:Date.now}
}, {
    collation:'contacts',
    versionKey:false
});

var model = mongoose.model('Contacts', contactSchema);

module.exports = model;