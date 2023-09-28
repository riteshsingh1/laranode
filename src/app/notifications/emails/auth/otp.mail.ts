import env from "@/config";
import MAIL from "@/core/mail";

const OTP_MAIL = (email: string, otp: string) => {
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Confirmation</title>
        <style>
            /* Add your custom styles here */
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
                background-color: #fff;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                border-radius: 5px;
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .otp-code {
                font-size: 36px;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
            }
            .instructions {
                text-align: center;
                margin-bottom: 20px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>OTP Confirmation</h1>
            </div>
            <div class="otp-code">
                Your One-Time Password (OTP): <span style="color: #007BFF;">${otp}</span>
            </div>
            <div class="instructions">
                Please use this OTP to complete your action. This OTP is valid for a single use and will expire in a short time.
            </div>
            <div class="footer">
                This email was sent to you by ${env.APP_NAME}.
            </div>
        </div>
    </body>
    </html>
    `;

  MAIL.sendMail({
    to: email,
    subject: "OTP Confirmation",
    html,
  });
};

export default OTP_MAIL;
