// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const path = require('path');
const port = 3000;
const mongoose = require('mongoose');
const weatherEntry = require('./model/weatherEntry');

/* Middleware*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

//Initialize the main project folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connect To MongoDB
mongoose.connect('mongodb://localhost:27017/weather-journal',
{useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>{
            console.log('Mongo Connection Opened');
        })
        .catch(err =>{
            console.log("Mongo Error happened");
            console.log(err);
        });

// Home Route
app.get("/",async(req,res)=>{
    const entries = await weatherEntry.find({});
    if(Object.keys(entries).length==0){
        res.render('index',{entries: "empty"});
    }
    else{
        res.render('index',{entries: entries});
    }
});

// Post Route
app.post("/addWeatherEntry",async(req,res)=>{
    weatherEntry.insertMany(req.body);
    console.log(req.body);
});

// Spin up the server
app.listen(port,()=>{
    console.log('Listening');
});



  