const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetPasswordEmail = async (toEmail, resetToken) => {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: `"VotePlatform" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Reset your VotePlatform password",
    html: `
      <p>Hello,</p>
      <p>You requested to reset your password.</p>
      <p>
        <a href="${resetLink}">Click here to reset your password</a>
      </p>
      <p>This link is valid for 15 minutes.</p>
      <p>If you didn’t request this, please ignore this email.</p>
    `,
  });
};

module.exports = sendResetPasswordEmail;
