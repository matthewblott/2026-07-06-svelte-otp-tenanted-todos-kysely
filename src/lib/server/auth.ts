import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { BETTER_AUTH_SECRET, BETTER_AUTH_URL } from '$app/env/private';
import { db } from './db';

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
  secret: BETTER_AUTH_SECRET,

  // Pass the better-sqlite3 instance; Better Auth wraps it with Kysely internally.
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
