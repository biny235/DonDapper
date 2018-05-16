const router = require('express').Router();
const nodemailer = require('nodemailer');
const secret = require('../../secret');
const { username, password } = secret.sendgrid;

router.post('/send', (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: username || process.env.SENDGRID_USERNAME,
      pass: password || process.env.SENDGRID_PASSWORD
    }
  });
  transporter.sendMail(req.body, error => {
    if (error) {
      return console.log(error);
    }
    console.log('e-mail sent');
  });
});

module.exports = router;
