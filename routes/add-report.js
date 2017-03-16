

var mongoose = require('mongoose'),
    AddReportController = require('../controllers/add-report.js'),
    AddReportInfo = require('../models/add-report-info.js'),
    // User = require('../models/user.js'),
    AddReport = require('../models/add-report.js'),
    UserSession = require('../models/user-session.js'),
    session = [],
    AddReport = mongoose.model('NewReport');
/**
 * Get AddReports Listing
 */
exports.index  = function(req,res){
    AddReport.find( function(err, addReport) {
        if (err) return res.render('Error occurred');
        res.send(addReport);
    });
};

exports.findById = function(req,res){
    AddReport.findById( req.params.id, function( err, addReport ) {
        if (err) {
            res.send('Error occurred');
            return console.log(err);
        }
        res.send(addReport);
    });
};

exports.newAddReport = function(req,res){
    // var rep = new AddReport(req.body);
    //
    // rep.save(function(err){
    //     if (err) {
    //         res.send('Error occurred');
    //         return console.log(err);
    //     }
    //     res.send(rep);
    // });

    var addReportController = new AddReportController(AddReport, req.session, UserSession);

    var addReportInfo = new AddReportInfo(req.body);

    // If there's no form data, send a bad request code.
    if (!addReportInfo.userName) {
        res.status(400);
        return res.send('');
    }

    var apiResponseStep1 = addReportController.getUserFromReport(addReportInfo);

    res.set("Access-Control-Allow-Origin", "http://localhost:42550");   // Enable CORS in dev environment.

    if (apiResponseStep1.success) {
        addReportController.registerReport(apiResponseStep1.extras.addReport, function (err, apiResponseStep2) {

            return res.send(apiResponseStep2);
        });
    } else {
        return res.send(apiResponseStep1);
    }
};

exports.update = function(req,res){
    AddReport.findById( req.params.id, function( err, addReport ) {
        if(!addReport){
            res.send('AddReport not found with given id');
        }else{
            if(addReport.__v != req.body.__v){
                return res.send('Please use the update addReport details as ' + addReport);
            }
            addReport.set(req.body)
            if(addReport.isModified()){
                addReport.increment();
                addReport.save(function(err){
                    if (err) {
                        res.send('Error occurred');
                        return console.log(err);
                    }
                    res.send(addReport);
                });
            }else{
                res.send(addReport);
            }

        }
    });
};

exports.delete = function(req,res){
    AddReport.findById( req.params.id, function( err, addReport ) {
        if(!newReport){
            return res.send('AddReport not found with given id');
        }
        addReport.remove(function(err){
            if (err) {
                res.send('Error occurred');
                return console.log(err);
            }
            res.send('Deleted')
        });
    });
};