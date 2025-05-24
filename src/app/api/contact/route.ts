import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { parentName, studentName, email, phone, yearLevel, subjects, message } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // You can change this to your preferred SMTP server
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "mukesh@ticonsultants.com.au",
      subject: "New Free Trial Request - TI Academy",
      html: `
        <h2>New Free Trial Request</h2>
        <p><strong>Parent's Name:</strong> ${parentName}</p>
        <p><strong>Student's Name:</strong> ${studentName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Year Level:</strong> ${yearLevel}</p>
        <p><strong>Subjects Interested In:</strong></p>
        <ul>
          ${subjects.map(subject => `<li>${subject}</li>`).join('')}
        </ul>
        ${message ? `<p><strong>Additional Information:</strong></p><p>${message}</p>` : ''}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
} 