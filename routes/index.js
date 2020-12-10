const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')
//Dashboard model
const Dash = require('../models/Dashboard');
const Dash1 = require('../models/Dashboard1');
const { Router } = require('express');


//Welcome page
router.get('/' , (req,res) => res.render('welcome'));
//Dashboard
router.get('/dashboard' , ensureAuthenticated,(req,res) => 
res.render('dashboard',{
    name : req.user.name
}));


// //Dashboard handle
router.post('/addcase' ,(req,res,next) => { 
    var item = {
        caseno : req.body.caseno,
        crimecommitted : req.body.crimecommitted,
        criminalname : req.body.criminalname,
        officerid : req.body.officerid,
        officername : req.body.officername,
        description : req.body.description
        
    };
    var dashData = new Dash(item);
    //Saving data
    dashData.save();
    res.render('addcase',{
        caseno : req.body.caseno,
        crimecommitted : req.body.crimecommitted,
        criminalname : req.body.criminalname,
        officerid : req.body.officerid,
        officername : req.body.officername,
        description : req.body.description
    });
});

router.post('/addcriminal' ,(req,res,next) => { 
    var item = {
        criminalno : req.body.criminalno,
        crimecommitted : req.body.crimecommitted,
        criminalname : req.body.criminalname,
        descriptioncriminal : req.body.descriptioncriminal
        
    };
    var dashData1 = new Dash1(item);
    //Saving data
     dashData1.save();
    res.render('addcriminal',{
        criminalno : req.body.criminalno,
        crimecommitted : req.body.crimecommitted,
        criminalname : req.body.criminalname,
        descriptioncriminal : req.body.descriptioncriminal
    });
});



module.exports = router;