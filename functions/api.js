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
const fromEmail = "fitnessmiran@gmail.com";
const mailServer = mail.createTransport({
  service: "gmail",
  auth: {
    user: fromEmail,
    pass: "Aa123456#",
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
        res.status(200).json({ otp: "server error" });
      } else {
        res.status(200).json({ otp });
      }
    }
  );
});

module.exports.handler = serverless(app);
