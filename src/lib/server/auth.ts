import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { db } from './db';

export const auth = betterAuth({
	baseURL: env.BASE_URL,
	secret: env.BETTER_AUTH_SECRET,
  database: db,
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // Replace with your real email sender (Nodemailer, Resend, etc.)
        console.log(`[OTP] To: ${email}  Code: ${otp}  Type: ${type}`);
      },
      // Optional – defaults shown:
      // otpLength: 6,
      // expiresIn: 300, // seconds
    }),

    // Must be last – handles cookie setting in SvelteKit server actions.
    sveltekitCookies(getRequestEvent),
  ],
});
