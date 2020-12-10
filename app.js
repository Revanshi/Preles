const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session  = require('express-session');
const passport = require('passport');
const { urlencoded } = require('express');
const app = express();


// passport config
require('./config/passport')(passport);
//database

const db = require('./config/keys').MongoURI;

//connect to mongodb
mongoose.connect(db , { 
    useUnifiedTopology: true,
    useNewUrlParser : true
})
    .then(() => console.log("mongodb connected ..."))
    .catch(err => console.log(err));

//EJS
app.use(expressLayouts);
app.set('view engine' , 'ejs');


//BodyParser
app.use(express.urlencoded({ extended : true}));

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

app.use(passport.initialize());
app.use(passport.session());
  


  //connecting flash messages
  app.use(flash());

  //global vars
  app.use((req,res,next) =>{
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      next();

  })



//Routes
app.use('/' , require('./routes/index'));
app.use('/users' , require('./routes/users'));
app.get('/', function(request, response){
  return res.redirect('/addcase')
});
app.get('/', function(request, response){
  return res.redirect('/addcriminal')
});
app.get('/predict', function(req, res){
  return res.render('predict.ejs')
});
app.get('/casehistory', function(req, res){
  return res.render('casehistory.ejs')
});
app.get('/addcase', function(req, res){
  return res.render('addcase.ejs', {caseno : req.body.caseno});
});
app.get('/addcriminal', function(req, res){
  return res.render('addcriminal.ejs', {criminalno : req.body.criminalno});
});
const PORT = process.env.PORT || 5000;

app.listen(PORT , console.log(`Server started on ${PORT}`));


