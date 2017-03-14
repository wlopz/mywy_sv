
/**
 * Module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    http = require('http'),
    path = require('path'),
    addReportModel = require('./models/add-report'),
    addReportRoute = require('./routes/add-report')

var app = express();


    app.set('port', process.env.PORT || 3000);
    // app.use(express.favicon());
    // app.use(express.logger('dev'));
    // app.use(express.bodyParser());
    // app.use(express.methodOverride());
    // app.use(app.router);

    // parse application/json
    app.use(bodyParser.json());                        

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));


// app.configure('development', function(){
//     app.use(express.errorHandler());
// });

var uriString =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/HelloMongoose';

mongoose.connect('mongodb://mywayAdmin:abcd1234@ds013024.mlab.com:13024/myway-db');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Successfully mongodb is connected');
});

app.get('/add-report',addReportRoute.index);
app.get('/add-report/:id',addReportRoute.findById);
app.put('/add-report/:id',addReportRoute.update);
app.delete('/add-report/:id',addReportRoute.delete)
app.post('/add-report',addReportRoute.newAddReport);


http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
