const nodemailer = require("nodemailer");
const emailTemplate = require("../mail/templates/otp.js");
const resetTemplate = require("../mail/templates/resetPassword.js");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    });

    let info = await transporter.sendMail({
      from: `"Tawk | Absar Ahmad" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    });
    console.log(info.response);
    return info;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

exports.sendEmail = async function (email, otp) {
  try {
    //console.log(`Sending verification email to ${email} with OTP: ${otp}`);

    const mailResponse = await mailSender(
      email,
      "Verification Email",
      emailTemplate(email, otp)
    );

    //console.log(`Email sent successfully to ${email}: `, mailResponse.response);
    return mailResponse; // Return the response if needed
  } catch (error) {
    console.error(`Error sending verification email to ${email}: `, error);
    throw new Error(`Failed to send verification email to ${email}`);
  }
};

exports.sendResetPassword = async function (email, link) {
  try {
    //console.log(`Sending verification email to ${email} with OTP: ${otp}`);

    const mailResponse = await mailSender(
      email,
      "Reset Password Email",
      resetTemplate(email, link)
    );

    //console.log(`Email sent successfully to ${email}: `, mailResponse.response);
    return mailResponse; // Return the response if needed
  } catch (error) {
    console.error(`Error sending verification email to ${email}: `, error);
    throw new Error(`Failed to send verification email to ${email}`);
  }
};
