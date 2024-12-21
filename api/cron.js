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

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
  
   const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ["rajattalekar5143@gmail.com", "rajattalekar80@gmail.com"],
    subject: "Lesgooo...!!",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #fffbe6; color: #333;">
        <h1 style="color: #ff9900;">🐥 Gummoning Chuze! 🐥</h1>
        <p style="font-size: 18px;">Completed another amazing(not really) month together!💛</p>
        <div style="margin: 20px 0;">
          <img src="https://i.imgur.com/5k5U3hP.png" alt="Cute Chick" style="width: 150px; height: auto; border-radius: 50%; border: 3px solid #ff9900;" />
        </div>
        <p style="font-size: 16px; font-weight: bold;">Jhela hua samay: <strong>${calculateTimeTogether()}</strong></p>
        <p style="font-size: 18px;">You're the chotu sa tingu sa, my little Chuza! 🐣</p>
        <p style="font-size: 16px;">Love, <br><strong>Your Aalu</strong> ❤️</p>
        <div style="margin-top: 20px; font-size: 14px; color: #777;">
          <p>PS: Umm i want to be with u jaise pehle the...</p>
        </div>
      </div>
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
