var AddReportController = function (addReportModel, report) {
    this.ApiResponse = require('../models/api-response.js');
    this.ApiMessages = require('../models/api-messages.js');
    this.AddReportInfo = require('../models/add-report-info.js');
    this.addReportModel = addReportModel;
    this.report = report;
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
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.EMAIL_ALREADY_EXISTS } }));
        } else {

            newReport.save(function (err, rprt, numberAffected) {

                if (err) {
                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
                }

                if (numberAffected === 1) {

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
                } else {
                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.COULD_NOT_CREATE_USER } }));
                }

            });
        }

    });
};

AddReportController.prototype.getUserFromReport = function(userReportModel) {
    var me = this;

    var newReport = new this.NewReport({
        userName: userReportModel.userName,
        dateTimePosted: userReportModel.dateTimePosted,
        addReportSubject: userReportModel.addReportSubject,
        addReportDescription: userReportModel.addReportDescription
    });

    return new me.ApiResponse({ success: true, extras: { newReport: newReport } });
};

module.exports = AddReportController;