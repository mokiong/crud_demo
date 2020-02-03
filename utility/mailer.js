"use strict";
const nodemailer = require("nodemailer");

const senderUser = process.env.EMAIL_USERNAME;
const senderPass = process.env.EMAIL_PASSWORD;
const sendTo     = process.env.SEND_TO_EMAIL;

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: senderUser, // generated ethereal user
      pass: senderPass // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from    : senderUser,
    to      : sendTo, // list of receivers
    subject : "hi", // Subject line
    text    : "http://localhost:3000/employee/list" // plain text body
   
  });

  console.log('Succesfully sent mail');
}

sendMail().catch(console.error); 