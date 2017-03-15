var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddReportSchema = new Schema({
    userName: String,
    dateTimeFrom: { type: Date, default: Date.now },
    addReportSubject: String,
    addReportDescription: String,

    // TODO: Add description field.
});

module.exports = mongoose.model('NewReport', AddReportSchema);