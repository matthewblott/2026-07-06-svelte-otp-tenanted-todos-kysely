import { betterAuth } from 'better-auth';
import { anonymous, emailOTP } from 'better-auth/plugins';
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
          // console.log(`[CREATE USER - before]`);
          // console.log(user);
          return {
            data: {
              ...user,
              // name: user.name || (await generateUniqueRandomName(db)),
              name: user.name || generateRandomName(),
            },
          };
        },
        after: async (user, ctx) => {
          // const existingSession = await auth.api.getSession({
          //   headers: ctx.headers,
          // });
          //
          // const existingUser = existingSession?.user;
          // const isAnonymous = Boolean(Number(existingUser?.isAnonymous));
          //
          // if(!isAnonymous) {
          // }

          const newUserId = user.id;
          await createTenantDb(newUserId); 
        },

      },
      delete: {
        after: async (user) => {
          const userId = user.id;
          await deleteTenantDb(userId);

          const isAnonymous = Boolean(Number(user.isAnonymous));
          console.log(`[DELETE USER - after] isAnonymous: ${isAnonymous}  userId: ${userId} userName: ${user.name}`); 
          // // Don't delete the anonymous user's database here as we may want to reuse it if the account is being linked
          if(!isAnonymous) {
            const userId = user.id;
            await deleteTenantDb(userId);
          }
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
    anonymous({
      emailDomainName: "example.com",
      // disableDeleteAnonymousUser: true,
      disableDeleteAnonymousUser: false,
      generateName: async (ctx) => {
        // ctx.request      — the raw Request object (headers, etc.)
        // ctx.headers       — request headers
        // ctx.context        — AuthContext: db access, config, adapter, etc.

        return `Guest-${crypto.randomUUID().slice(0, 8)}`;
      },
      onLinkAccount: async ({ anonymousUser, newUser}, ctx) => {
        // Delete database created with the new user as there is already a database for this user
        // await rm(`./storage/tenants/${newUser.user.id}.sqlite3`)
        
        await copyAnonymousTenantDb(anonymousUser.user.id, newUser.user.id);

        // if (ctx) {
        //   await ctx.context.internalAdapter.deleteSessions(anonymousUser.user.id);
        //   await ctx.context.internalAdapter.deleteUser(anonymousUser.user.id);
        // }

        // await rm(`./storage/tenants/${anonymousUser.user.id}.sqlite3`)
      }
    }),
    // Must be last – handles cookie setting in SvelteKit server actions.
    sveltekitCookies(getRequestEvent),
  ],
});

function generateRandomName() {
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

  const targetPath = `./storage/tenants/${userId}.sqlite3`;
  const target = Bun.file(targetPath);

  if (!(await target.exists())) {
    await copyFile("./storage/main.sqlite3", targetPath); 
  }

}

async function copyAnonymousTenantDb(oldUserId: string, newUserId: string) {
  const targetPath = `./storage/tenants/${newUserId}.sqlite3`;
  const target = Bun.file(targetPath);

  if (!(await target.exists())) {
    await copyFile(`./storage/tenants/${oldUserId}.sqlite3`, targetPath); 
  }

}

async function deleteTenantDb(userId: string): Promise<void> {
  await rm(`./storage/tenants/${userId}.sqlite3`, { force: true })
} 
