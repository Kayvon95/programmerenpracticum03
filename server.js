/**
 * Created by Kayvon Rahimi on 15-5-2017.
 */
var http = require('http');
var express = require('express');
var config = require('./config.json');
var bparser = require('body-parser');

//declare appname and type
var app = express();

app.use(bparser.urlencoded({ extended: true }));

//set port for app
app.set('PORT', config.webPort);
var port = process.env.PORT || app.get('PORT');

//set source for app
app.use('/api/v1', require('./routes/routes_api_v1'));

//Print every queried url to console.
app.all('*', function(request, response, next) {
    console.log(request.method + " " + request.url);
    next();
});

//About this project
app.get('/about', function(req, res){
    res.send('This project serves to teach the creator how to query a database through a server.');
});

//On bad requests : 404
app.get('*', function(request, response) {
    response.status(404);
    response.send('404 - Not found' + '\n'  +
                    'Please check your URL and try again.');
});

//Terminal listeningToPort output
app.listen( port, function(){
    console.log('App is listening on PORT ' + port);
});


//export the app
module.exports = app;