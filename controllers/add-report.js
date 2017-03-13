var AddReportController = function (addReportModel) {
    this.ApiResponse = require('../models/api-response.js');
    this.ApiMessages = require('../models/api-messages.js');
    this.addReportModel = addReportModel;
};

AddReportController.prototype.getAddReport = function (userId, fromDate, reportType, reportSubject, reportDescription, callback) {

    var me = this;

    var reportTypeCategories = ["Steps", "Stairway", "Elevator", "Escalator", "Ramp", "Rail(s)", "Other", "Hazard"];

    for(var i = 0; i < reportTypeCategories.length; i++) {
        var rtc = reportTypeCategories[i];
        // var el = document.createElement("option");
        // el.textContent = opt;
        // el.value = opt;
        // select.appendChild(el);
    }

    // var query = {
    //     ownerUserId: userId,
    //     fromDate: { '$gte': fromDate },
    //     toDate: { '$lt': toDate }
    // };
    //
    // me.bookingModel.find(query)
    //     .sort({
    //         sortColumn: sortDir
    //     })
    //     .skip(pageSize * page)
    //     .limit(pageSize)
    //     .exec(function (err, bookings) {
    //         if (err) {
    //             return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
    //         }
    //
    //         return callback(err, new me.ApiResponse({success: true, extras: {bookings: bookings}}));
    //     });
};

module.exports = AddReportController;