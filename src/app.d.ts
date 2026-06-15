import type { Session, User } from 'better-auth';

declare module '$app/env/private' {
  export const DATABASE_URL: string;
  export const GOOSE_DRIVER: string;
  export const GOOSE_DBSTRING: string;
  export const GOOSE_MIGRATION_DIR: string;
  
  export const BETTER_AUTH_URL: string;
  export const BETTER_AUTH_SECRET: string;

  export const ORIGIN: string;

}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      session: Session | null;
      user: User | null;
    }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
