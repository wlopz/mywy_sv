

var mongoose = require('mongoose'),
    AddReport = mongoose.model('NewReport')
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
    var emp = new AddReport(req.body);

    emp.save(function(err){
        if (err) {
            res.send('Error occurred');
            return console.log(err);
        }
        res.send(emp);
    });
}

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