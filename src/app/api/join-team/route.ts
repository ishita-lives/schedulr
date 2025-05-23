import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, experience, qualifications, resume, coverLetter } = body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
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
      subject: "New Job Application - TI Academy",
      html: `
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Experience:</strong></p>
        <p>${experience}</p>
        <p><strong>Qualifications:</strong></p>
        <p>${qualifications}</p>
        <p><strong>Cover Letter:</strong></p>
        <p>${coverLetter}</p>
      `,
      attachments: resume ? [
        {
          filename: resume.name,
          content: resume.data,
        }
      ] : [],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
} 