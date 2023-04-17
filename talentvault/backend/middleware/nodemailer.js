const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    secure: true,
    requireTLS: true,
    auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.PASSWORD}`
    }
});

module.exports = transporter;