"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'emmstest1@gmail.com', // generated ethereal user
      pass: 'emmsadmin' // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from    : 'emmstest1@gmail.com',
    to      : "mokiong1427@gmail.com", // list of receivers
    subject : "Hello ✔", // Subject line
    text    : "Hello world?", // plain text body
    html    : "<b>Hello world?</b>" // html body
  });

  console.log('Succesfully sent mail');
}

sendMail().catch(console.error);