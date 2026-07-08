export const publicRoutes = {
  auth: {
    // signIn: () => `/auth/sign-in`,
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
    // signOut: () => `/sign-out`,
  },
  home: () => `/`,
} as const;
