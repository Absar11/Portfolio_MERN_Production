const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  secure: false,
});

const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    //validation
    if (!name || !email || !msg) {
      return res.status(500).send({
        success: false,
        message: "Plesase Provide all field",
      });
    }

    //email matter
    transporter.sendMail({
      to: process.env.MAIL_USER,
      from: process.env.MAIL_USER,
      subject: "Regarding MERN portfolio App",
      html: `
      <h5>Detail Information</h5>
      <ul>
      <li><p>Name: ${name}</p></li>
      <li><p>Email: ${email}</p></li>
      <li><p>Message: ${msg}</p></li>
      </ul>
      `,
    });

    return res.status(200).send({
      success: true,
      message: "Your Message Send Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send EMail API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };
