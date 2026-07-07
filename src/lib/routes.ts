export const routes = {
  auth: {
    signIn: {
      browser: () => 
        `/auth/sign-in`,
      server: () => 
        `/auth/sign-in/server`,
    },
    verify: {
      browser: () => 
        `/auth/verify`,
      server: () => 
        `/auth/verify/server`,
    },
    signOut: {
      browser: () => 
        `/auth/sign-out`,
      server: () => 
        `/auth/sign-out/server`,
    },
  },
  user: {
    delete: {
      browser: () => 
        `/user/delete`,
      server: () => 
        `/user/delete/server`,
    },
    rename: {
      browser: () => 
        `/user/rename`,
      server: () => 
        `/user/rename/server`,
    },
  },
} as const;


