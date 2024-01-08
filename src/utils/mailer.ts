import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a new transporter object
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use SSL/TLS
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_APP_PASSWORD,
  },
});

// Create a function to send an email
// export async function sendEmail(to: string, subject: string, message: string) {
export async function sendEmail(to: string, subject: string, message: string) {
  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to,
    subject,
    text: message,
  };

  //   try {
  //     await transporter.sendMail(mailOptions);
  //     return { sent: true };
  //   } catch (error) {
  //     return { sent: false, error };
  //   }
  // }

  try {
    await transporter.sendMail(mailOptions);
    return { sent: true };
  } catch (error) {
    return { sent: false, error };
  }
}
