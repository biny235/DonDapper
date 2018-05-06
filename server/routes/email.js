const router = require('express').Router();
const nodemailer = require('nodemailer');
const {SENDGRID_USERNAME, SENDGRID_PASSWORD} = require('../../secret').sendGrid

router.post('/send', (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: SENDGRID_USERNAME,
      pass: SENDGRID_PASSWORD
    }
  });
  // SendGrid password and username has to be entered
  transporter.sendMail(req.body, (error) => {
    if (error) {
      return console.log(error);
    }
    console.log('e-mail sent');
  });
});

module.exports = router;
