import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message, id } = await req.json();

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

    // Define email content
    const emailContent = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Vehicle Details:</strong> ${vehicleDetails}</p>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Support" <${SMTP_USER}>`,
      to: "vihanganethusara00@gmail.com", // Replace with the recipient's email
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
