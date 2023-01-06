
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');

const routes  = require('./routes');
const { route } = require('./routes');

const bodyParser = require('body-parser');
var path = require('path');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
var logger = require('morgan');
var fs = require('fs');
var nodemailer = require('nodemailer');

const app = express();

// const server = http.server(app);

var cors = require('cors'); 
app.use(cors({
    origin:'http://localhost:3000',
    optionsSuccessStatus:200
}));


// require dot-env
  require('dotenv').config();


//Set up default mongoose connection
let mongoDB = process.env.DBURL;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("connected to Database ");
});


  // set up auth
  app.set('trust proxy', 1) // trust first proxy
  app.use(expressSession({
    secret: 'all i do is win',
    resave: false,
    store: MongoStore.create({mongoUrl:process.env.DBURL, collectionName: 'sessionStore',
     useUnifiedTopology: true  }, (err, suc)=>{
     if(err){console.log(err)}
     if(suc){
       console.log("db SUCESSFULLY CONNECTED")
     }
    }),
    saveUninitialized:true  ,
    cookie: { 
      maxAge: 1000 * 60 * 60 }
  }))

app.use(express.urlencoded({extended:false}));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());


app.use('/', routes);



// app.get('/', (req, res)=>{
//     res.send("This  is home page");

// });



const PORT = 4000;
app.listen(PORT, ()=>{
    console.log("App is running on port " + PORT);
});