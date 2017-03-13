var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AddReportSchema = new Schema({
    ownerUserId: String,
    dateTimeFrom: { type: Date, default: Date.now },
    addReportType:[{
        steps: Boolean,
        stairway: Boolean,
        elevator: Boolean,
        escalator: Boolean,
        ramp: Boolean,
        rails: Boolean,
        other: Boolean,
        hazard: Boolean
    }],
    addReportSubject: String,
    addReportDescription: String,

    // TODO: Add description field.
});

module.exports = mongoose.model('NewReport', AddReportSchema);