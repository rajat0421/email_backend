// backend/api/cron.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Function to send the email
async function sendEmail() {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Your email address
    to: ['rajattalekar5143@gmail.com', 'rajattalekar80@gmail.com'], // Add your email and hers here
    subject: 'Congratulations on Completing Another Month!',
    html: `
      <h1>Congratulations!</h1>
      <p>You’ve completed another month together. Here's to many more!</p>
      <p>Total Time Together: <strong>${calculateTimeTogether()}</strong></p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.log('Error sending email:', error);
  }
}

// Function to calculate the time together
function calculateTimeTogether() {
  const startDate = new Date('2023-03-22'); // Your start date
  const now = new Date();

  const totalMonths =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    now.getMonth() -
    startDate.getMonth();

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return `${years} years and ${months} months`;
}

// This will be the handler for the cron job
export default async function handler(req, res) {
  try {
    console.log('Sending email...');
    await sendEmail();
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email: ' + error.message);
  }
}
