"use server";

import { Resend } from "resend";

// Initialize Resend with your API key
// You'll need to add RESEND_API_KEY to your environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeToWaitlist(email: string) {
  try {
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    // Here you would typically save the email to your database
    // For example: await db.insert({ email, joinedAt: new Date() }).into('waitlist');

    // Send confirmation email
    const { data, error } = await resend.emails.send({
      from: "Your App <onboarding@yourdomain.com>",
      to: email,
      subject: "Welcome to the Waitlist!",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Thanks for joining our waitlist!</h1>
          <p>We're excited to have you on board. We'll notify you as soon as we launch.</p>
          <p>In the meantime, follow us on social media to stay updated:</p>
          <ul>
            <li><a href="https://twitter.com/yourapp">Twitter</a></li>
            <li><a href="https://instagram.com/yourapp">Instagram</a></li>
            <li><a href="https://discord.gg/yourserver">Discord</a></li>
          </ul>
          <p>Best regards,<br>The Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error: "Failed to send confirmation email." };
    }

    return { success: true };
  } catch (error) {
    console.error("Waitlist subscription error:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
