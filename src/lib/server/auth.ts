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
  user: {
    deleteUser: { 
      enabled: true
      // Once enabled you can call: authClient.deleteUser
    }
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
          // Create tenant database
          // await initTenantDb(user.id);
        },

      },
      update: {
        before: async (user) => {
          if (user.name) {
            // const existing = await db
            //   .selectFrom('user')
            //   .select('id')
            //   .where('name', '=', user.name)
            //   .executeTakeFirst();
            //
            // if (existing && existing.id !== user.id) {
            //   throw new Error('Name already taken');
            // }
          }
          return { data: user };
        },
      },
    },
  },
  plugins: [
    emailOTP({ 
      async sendVerificationOTP({ email, otp, type }) { 
        // Replace with your real email sender (Nodemailer, Resend, etc.)
        console.log(`[OTP] To: ${email}  Code: ${otp}  Type: ${type}`);

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

// async function generateUniqueRandomName(db): Promise<string> {
//   let name: string;
//   let exists = true;
//
//   while (exists) {
//     name = generateRandomName();
//     const existing = await db
//       .selectFrom('user')
//       .select('id')
//       .where('name', '=', name)
//       .executeTakeFirst();
//     exists = !!existing;
//   }
//
//   return name!;
// }
