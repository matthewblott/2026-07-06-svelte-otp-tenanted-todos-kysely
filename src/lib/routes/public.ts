export const publicRoutes = {
  auth: {
    signIn: () => 
      `/auth/sign-in`,
    verify: () => 
      `/auth/verify`,
  },
  home: () => `/`,
} as const;
