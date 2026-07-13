import type { Session, User } from 'better-auth';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      session: Session | null
      user: User | null
      db: Database.Database | null
    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
