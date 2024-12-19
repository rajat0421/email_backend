import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    // Send the email
    await sendEmail();
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email: " + error.message);
  }
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or app-specific password
  },
});

// Function to send the email
async function sendEmail() {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ["rajattalekar5143@gmail.com", "rajattalekar80@gmail.com"],
    subject: "Congratulations on Completing Another Month!",
    html: `
      <h1>Congratulations!</h1>
      <p>You’ve completed another month together. Here's to many more!</p>
      <p>Total Time Together: <strong>${calculateTimeTogether()}</strong></p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent successfully");
}

// Function to calculate the time together
function calculateTimeTogether() {
  const startDate = new Date("2023-03-22");
  const now = new Date();

  const totalMonths =
    (now.getFullYear() - startDate.getFullYear()) * 12 +
    now.getMonth() -
    startDate.getMonth();

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return `${years} years and ${months} months`;
}

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
