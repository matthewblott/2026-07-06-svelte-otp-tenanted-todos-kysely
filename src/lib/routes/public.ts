export const publicRoutes = {
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
  },
  home: () => `/`,
} as const;
