import env from "@/config";
import MAIL from "@/core/mail";

const VERICATION_MAIL = (email: string, token: string) => {
  const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Verification</title>
    <style>
        /* Add your CSS styles here */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .header {
            text-align: center;
        }
        .header h1 {
            color: #333;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            background-color: #007BFF;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Account Verification</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>Thank you for signing up for our service. To verify your account, please click the button below:</p>
            <p><a class="button" href="${env.APP_URL}/auth/verify-via-email?token=${token}">Verify Account</a></p>
            <p>If the button above does not work, you can also copy and paste the following link into your browser:</p>
            <p><a href="${env.APP_URL}/auth/verify-via-email?token=${token}">YOUR_VERIFICATION_LINK</a></p>
            <p>If you did not sign up for our service, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
    `;
  MAIL.sendMail({
    to: email,
    subject: "Verify Your Account On " + env.APP_NAME,
    html,
  });
};

export default VERICATION_MAIL;
