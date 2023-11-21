const express = require("express");
const app = express();
const cors = require("cors");
const mail = require("nodemailer");

const serverless = require("serverless-http");
// otp generator
const getOTP = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// send email
const fromEmail = "fitnessmiran@outlook.com";
const mailServer = mail.createTransport({
  host: 'smtp.office365.com',
    port: 587,
    secure: false, // true for 465, false for other ports
  auth: {
    user: fromEmail,
    pass: "Miraf123#",
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.status(200).json({ msg: "hi" }));
app.post("/otp", (req, res) => {
  const toEmail = req.body.email;
  const otp = getOTP(111111, 999999);

  mailServer.sendMail(
    {
      from: fromEmail,
      to: toEmail,
      subject: "otp",
      text: `your otp is : ${otp}`,
    },
    (err, infor) => {
      if (err) {
        res.status(200).json({ otp: "server error",err });
      } else {
        res.status(200).json({ otp });
      }
    }
  );
});

module.exports.handler = serverless(app);
