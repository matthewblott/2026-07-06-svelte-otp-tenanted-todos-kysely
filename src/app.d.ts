import type { Session, User } from 'better-auth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      session: import('better-auth').Session | null
      user: import('better-auth').User | null
      db: Database.Database | null
    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
