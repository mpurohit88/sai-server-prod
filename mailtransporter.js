const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const mailAccountUser = 'admin@sheeranalyticsandinsights.com'
const mailAccountPass = 'Gn&vPAKU9'

const trans = nodemailer.createTransport(smtpTransport({
  service: 'newhost.analysisandinsights.com',
  tls: { rejectUnauthorized: false },
  auth: {
    user: mailAccountUser,
    pass: mailAccountPass
  }
}));

module.exports = { trans: trans };
