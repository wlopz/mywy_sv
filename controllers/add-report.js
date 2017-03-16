var AddReportController = function (addReportModel, report) {
    this.ApiResponse = require('../models/api-response.js');
    this.ApiMessages = require('../models/api-messages.js');
    this.AddReportInfo = require('../models/add-report-info.js');
    this.addReportModel = addReportModel;
    this.report = report;
    this.addReport = require('../models/add-report.js');
};

AddReportController.prototype.getSession = function () {
    return this.report;
};

AddReportController.prototype.setSession = function (report) {
    this.report = report;
};

AddReportController.prototype.registerReport = function (newReport, callback) {
    var me = this;
    me.addReportModel.findOne({ userName: newReport.userName }, function (err, rprt) {

        if (err) {
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }

        if (rprt) {
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.USERNAME_NOT_FOUND } }));
        } else {

            newReport.save(function (err, rprt) {

                if (err) {
                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
                }

                var addReportInfoModel = new me.AddReportInfo({
                    userName: rprt.userName,
                    dateTimePosted: rprt.dateTimePosted,
                    addReportSubject: rprt.addReportSubject,
                    addReportDescription: rprt.addReportDescription
                });

                return callback(err, new me.ApiResponse({
                    success: true, extras: {
                        addReportInfoModel: addReportInfoModel
                    }
                }));

            });
        }

    });
};

AddReportController.prototype.getUserFromReport = function(userReportModel) {
    var me = this;

    var addReport = new this.addReport({
        userName: userReportModel.userName,
        dateTimePosted: userReportModel.dateTimePosted,
        addReportSubject: userReportModel.addReportSubject,
        addReportDescription: userReportModel.addReportDescription
    });

    return new me.ApiResponse({ success: true, extras: { addReport: addReport } });
};

module.exports = AddReportController;