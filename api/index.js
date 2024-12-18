const nodemailer = require('nodemailer');
const cron = require('node-cron');
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
function sendEmail() {
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
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

// Schedule the email to run on the 22nd of every month at 12:00 AM
cron.schedule('0 0 22 * *', () => {
  console.log('Sending email...');
  sendEmail();
});
  
