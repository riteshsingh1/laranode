import env from "@/config";
import nodemailer from "nodemailer";

// create reusable transporter object using the default SMTP transport
const MAIL = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: Number(env.MAIL_PORT),
  secure: Number(env.MAIL_PORT) === 587 ? true : false, // true for 465, false for other ports
  auth: {
    user: env.MAIL_USERNAME, // generated ethereal user
    pass: env.MAIL_PASSWORD, // generated ethereal password
  },
});

export default MAIL;
