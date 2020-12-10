const mongoose = require('mongoose');
const Dschema1 = new mongoose.Schema({
    criminalno:Number,
    crimecommitted:String,
    criminalname:String,  
    descriptioncriminal: String,   
    date:{
        type : Date,
        default : Date.now
    }

});

// modelname :Dashboard
// Schema is  : Dschema
const dashData1= mongoose.model('criminalData' , Dschema1);

module.exports = dashData1;