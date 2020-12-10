const mongoose = require('mongoose');

const Dschema = new mongoose.Schema({
    caseno:Number,
    crimecommitted:String,
    criminalname:String, 
    officerid:Number,
    officername:String, 
    description: String,   
    date:{
        type : Date,
        default : Date.now
    }

});

// modelname :Dashboard
// Schema is  : Dschema
const dashData= mongoose.model('cData' , Dschema);
module.exports = dashData;

