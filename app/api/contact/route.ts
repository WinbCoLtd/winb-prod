import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, vehicleId } = await req.json();
    const id = Number(vehicleId);

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    let vehicleDetails = "Not specified";

    // Handle specific inquiry if ID is provided
    if (id) {
      const vehicle = await prisma.vehicle.findUnique({
        where: { id },
      });

      if (!vehicle) {
        return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
      }

      vehicleDetails = vehicle.title;
    }

    // Validate SMTP environment variables
    const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return NextResponse.json(
        { error: "SMTP configuration is missing" },
        { status: 500 }
      );
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Define improved email content with logo and responsive design
    const emailContent = `
      <!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Inquiry</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .email-header {
              background-color: #facc15;
              padding: 20px;
              text-align: center;
              color: #1f1f1f;
            }
            .email-header img {
              max-width: 120px;
              margin-bottom: 10px;
            }
            .email-body {
              padding: 20px;
            }
            .email-body h1 {
              font-size: 24px;
              color: #333;
              margin-bottom: 10px;
            }
            .email-body p {
              font-size: 16px;
              color: #555;
              line-height: 1.5;
              margin-bottom: 10px;
            }
            .email-footer {
              background-color: #f1f1f1;
              padding: 10px;
              text-align: center;
              font-size: 14px;
              color: #888;
            }
            @media only screen and (max-width: 600px) {
              .email-header, .email-body, .email-footer {
                padding: 15px;
              }
              .email-body h1 {
                font-size: 20px;
              }
              .email-body p {
                font-size: 14px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <!-- Header Section -->
            <div class="email-header">
              <img src="https://via.placeholder.com/120" alt="Company Logo" />
              <h1>New Inquiry</h1>
            </div>
            
            <!-- Body Section -->
            <div class="email-body">
              <h1>Hi, Admin sir</h1>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              <p><strong>Message:</strong> ${message}</p>
              <p><strong>Vehicle Details:</strong> ${vehicleDetails}</p>
            </div>
            
            <!-- Footer Section -->
            <div class="email-footer">
              <p>Thank you for reaching out to us!</p>
              <p>&copy; ${new Date().getFullYear()} winb Company. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: `vihanm0120@gmail.com`,
      to: email, 
      subject: "New Inquiry",
      html: emailContent,
    });

    return NextResponse.json(
      { message: "Inquiry submitted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
