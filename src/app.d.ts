// import type { Session, User } from 'better-auth';
import type { auth } from '$lib/server/auth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      // session: Session | null
      // user: User | null
      // db: Database | null
      session: Session['session'] | null;
      user: Session['user'] | null;
      db: Database | null;
    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
