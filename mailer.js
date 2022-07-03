const nodemailer = require('nodemailer');

const { trans } = require("./mailtransporter");
const Log = require('./models/log.js');

const Mailer = function (params) {
    this.address = params.address;
    this.message = params.message;
    this.number = params.number;
    this.emailId = params.emailId;
    this.name = params.name;
    this.type = params.type;
    this.report = params.report;
};

Mailer.prototype.sendEmail = function (callback) {

    const mail = {
        from: 'admin@sheeranalyticsandinsights.com',
        to: 'query@sheeranalyticsandinsights.com',
        bcc: 'mpurohit88@gmail.com',
        subject: `Query from Customer`,
        html: getBody(this)
    }

    try {
        const log = new Log({ data: this });
        log.insert();
    } catch (ex) {
        console.log(ex);
    }

    trans.sendMail(mail, (err, info) => {
        if (err) {
            console.log(err);

            callback(false);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        callback(true);
    });
}

function getBody(data) {
    console.log("data...", data);
    if (data.type === "1") {
        return 'Dear Admin, <br /><br /> Please find the query </br> </br> Message: ' + data.message + ' <br />number: ' + data.number + ' <br />email address: ' + data.emailId + ' <br />name: ' + data.name;
    } else {
        return 'Dear Admin, <br /><br /> Please find the enquiry for </br> </br> Report: ' + data.report + '<br /> Message: ' + data.message + ' <br />number: ' + data.number + ' <br />email address: ' + data.emailId + ' <br />name: ' + data.name;
    }
}

module.exports = Mailer;