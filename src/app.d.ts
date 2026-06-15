import type { Session, User } from 'better-auth';

declare module '$app/environment' {
  export const browser: boolean;
  export const dev: boolean;
  export const building: boolean;
  export const version: string;
}

declare module '$app/env/private' {
  export const DATABASE_URL: string;
  export const GOOSE_DRIVER: string;
  export const GOOSE_DBSTRING: string;
  export const GOOSE_MIGRATION_DIR: string;
  
  export const BETTER_AUTH_URL: string;
  export const BETTER_AUTH_SECRET: string;
  export const building: boolean;
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
