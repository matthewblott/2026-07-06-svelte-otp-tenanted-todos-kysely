import { betterAuth } from 'better-auth';
import { emailOTP } from 'better-auth/plugins';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import { env } from '$env/dynamic/private';
import { db } from './db';
import { copyFile, mkdir, rm } from 'fs/promises'
import nodemailer from 'nodemailer';

export const auth = betterAuth({
	baseURL: env.BASE_URL,
	secret: env.BETTER_AUTH_SECRET,
  database: db,
  advanced: {
    database: {
      generateId: (options) => {
        if (options.model === "user" || options.model === "users") {
          return undefined; // let SQLite auto-increment
        }
        return crypto.randomUUID();
      },
    },
  },
  user: {
    // modelName: "users",
    deleteUser: { 
      enabled: true
      // Once enabled you can call: authClient.deleteUser
    }
  },
  session: {
    // modelName: "sessions",
  },
  account: {
    // modelName: "accounts",
  },
  verification: {
    // modelName: "verifications",
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              name: user.name || generateRandomName(),
              // name: user.name || (await generateUniqueRandomName(db)),
            },
          };
        },
        after: async (user) => {
          const userId = user.id;
          await createTenantDb(userId); 
        },

      },
      delete: {
        after: async (user) => {
          const userId = user.id;
          await deleteTenantDb(userId);
        },
      },
    },
  },
  plugins: [
    emailOTP({ 
      async sendVerificationOTP({ email, otp, type }) { 
        console.log(`[OTP] To: ${email}  Code: ${otp}  Type: ${type}`);

        const transporter = nodemailer.createTransport({
          host: env.SMTP_HOST, 
          port: env.SMTP_PORT,
          auth: {
            user: env.SMTP_USER, 
            pass: env.SMTP_PASSWORD
          }
        });

        const mailOptions = {
          from: "Private Person <hello@skribl.p34k.de>",
          to: `A Test User <${email}>`,
          subject: "Hello from Mailtrap",
          text: `This is a test e-mail message. OTP Code: ${otp}`,
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(`Error: ${error}`);
          } else {
            console.log(`Email sent: ${info.response}`);
          }
        });

        if (type === "sign-in") { 
          // Send the OTP for sign in
        } else if (type === "email-verification") { 
          // Send the OTP for email verification
        } else { 
          // Send the OTP for password reset
        } 
      }, 
      // Optional – defaults shown:
      // otpLength: 6,
      // expiresIn: 300, // seconds
    }),

    // Must be last – handles cookie setting in SvelteKit server actions.
    sveltekitCookies(getRequestEvent),
  ],
});

function generateRandomName() {
  // const adjectives = ['Swift', 'Quiet', 'Brave', 'Clever', 'Bright'];
  // const nouns = ['Fox', 'Otter', 'Falcon', 'Wren', 'Lynx'];

  const adjectives = [
    'Swift', 'Quiet', 'Brave', 'Clever', 'Bright', 'Calm', 'Bold', 'Eager',
    'Fierce', 'Gentle', 'Happy', 'Jolly', 'Keen', 'Lively', 'Mighty', 'Nimble',
    'Proud', 'Quick', 'Rapid', 'Silent', 'Tidy', 'Vivid', 'Witty', 'Zesty',
    'Amber', 'Azure', 'Crimson', 'Golden', 'Silver', 'Copper', 'Ivory', 'Jade',
    'Cosmic', 'Frosty', 'Rustic', 'Solar', 'Stormy', 'Sunny', 'Windy', 'Misty',
    'Ancient', 'Curious', 'Daring', 'Elegant', 'Faithful', 'Graceful', 'Honest',
    'Icy', 'Jovial', 'Kind', 'Loyal', 'Merry', 'Noble', 'Playful', 'Radiant',
  ];

  const nouns = [
    'Fox', 'Otter', 'Falcon', 'Wren', 'Lynx', 'Badger', 'Heron', 'Raven',
    'Panther', 'Hawk', 'Wolf', 'Bear', 'Tiger', 'Eagle', 'Owl', 'Deer',
    'Rabbit', 'Beaver', 'Squirrel', 'Sparrow', 'Robin', 'Crane', 'Swan', 'Dove',
    'Comet', 'Meteor', 'Nebula', 'Aurora', 'Ember', 'Ridge', 'Summit', 'Canyon',
    'River', 'Harbor', 'Meadow', 'Forest', 'Glacier', 'Valley', 'Boulder', 'Cove',
    'Pioneer', 'Voyager', 'Wanderer', 'Ranger', 'Scout', 'Drifter', 'Nomad',
    'Sentinel', 'Guardian', 'Pilgrim', 'Rover', 'Explorer', 'Mariner', 'Pathfinder',
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 1000);
  const name = `${adjective}${noun}${number}`.toLowerCase();
  return name;
}

async function createTenantDb(userId: string): Promise<void> {
  await mkdir('./storage/tenants', { recursive: true })
  await copyFile(
    './storage/main.sqlite3',
    `./storage/tenants/${userId}.sqlite3`
  )
}

async function deleteTenantDb(userId: string): Promise<void> {
  await rm(`./storage/tenants/${userId}.sqlite3`)
} 
