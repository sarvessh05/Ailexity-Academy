# How to Integrate a Real-Time OTP System

Since this is currently a client-side application (HTML/CSS/JS running in the browser), we cannot send real emails or text messages directly without exposing sensitive API keys. In a production environment, you need a **Backend Server** or a **Serverless Service** to handle this securely.

## Architecture Overview

1.  **Client (Frontend)**: User interacts with the UI, enters email/phone.
2.  **API Request**: Frontend sends a request to your Backend (e.g., `POST /api/send-otp` with `{ email: 'user@example.com' }`).
3.  **Backend Server**:
    *   Generates a random 6-digit code (e.g., `482910`).
    *   Stores this code temporarily in a database (like Redis or MongoDB) associated with the email + an expiration time (e.g., 5 mins).
    *   Calls an external provider (Twilio, SendGrid, AWS SES) to send the message.
4.  **Provider**: Delivers the SMS or Email to the user.
5.  **User**: Enters code on the Client.
6.  **Verification**: Client sends code to Backend (`POST /api/verify-otp`). Backend checks if the code matches what's in the DB.

## Recommended Tools

*   **Email**: SendGrid, Mailgun, AWS SES, or NodeMailer (for SMTP).
*   **SMS**: Twilio, SNS, or Firebase Authentication.
*   **Database**: Redis (best for short-lived OTPs), MongoDB, or PostgreSQL.

## Example: Node.js + Nodemailer (Backend Code Snippet)

If you were running a Node.js server, the code would look like this:

```javascript
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// 1. Generate OTP
const otp = crypto.randomInt(100000, 999999).toString();

// 2. Store OTP (Pseudo-code)
// await db.saveOtp(userEmail, otp);

// 3. Send Email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'your-email@gmail.com', pass: 'your-app-password' }
});

await transporter.sendMail({
    from: 'AILexity Academy',
    to: userEmail,
    subject: 'Your Verification Code',
    text: `Your OTP is: ${otp}`
});
```

## Solution for This Project (Client-Side Simulation)

Since we don't have a backend right now, I have implemented a **Functional Simulation** in your `forgot-password.html`.

1.  **Generation**: The JavaScript now generates a real random 6-digit code.
2.  **Delivery**: Instead of emailing, we **simulate the email** by showing the code in a standard browser `alert()` (or console). Use this code to "test" the flow.
3.  **Validation**: The form now strictly checks if the input matches this generated code.
