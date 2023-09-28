import Twilio from "twilio";
import env from "@/config";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = env;

const client = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export async function sendSMS(to: string, body: string) {
  return client.messages.create({
    body,
    from: TWILIO_PHONE_NUMBER,
    to,
  });
}
