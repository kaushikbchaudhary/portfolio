import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill out all fields before sending." },
        { status: 400 }
      );
    }

    // Log the contact form submission for tracking
    console.log("Contact Form Submission Received:", { name, email, message });

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request data." }, { status: 400 });
  }
}
