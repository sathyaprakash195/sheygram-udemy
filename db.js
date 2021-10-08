const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://sathya:sathyapr@cluster0.dkuc0.mongodb.net/sheygram' , {useUnifiedTopology: true , useNewUrlParser: true});

const connection = mongoose.connection

connection.on('connected' , ()=>{
    console.log('Mongo db connection successfull')
})

connection.on('error' , ()=>{
    console.log('Mongo db connection error')
})

module.exports = mongoose