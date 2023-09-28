import env from "@/config";
import CryptoJS, { AES } from "crypto-js";

export function encrypt(text: string): string {
  return AES.encrypt(text, env.APP_SECRET).toString();
}

export function decrypt(encrypted: string): string {
  return AES.decrypt(encrypted, env.APP_SECRET).toString(CryptoJS.enc.Utf8);
}
