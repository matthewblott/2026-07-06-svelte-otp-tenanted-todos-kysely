export function createTenantRoutes(username: string) {
  return {
    user: {
      // delete: () => `/${username}/account/delete`,
      // rename: () => `/${username}/account/rename`,
      delete: {
        browser: () => 
          `/${username}/user/delete`,
        server: () => 
          `/${username}/user/delete/server`,
      },
      rename: {
        browser: () => 
          `/${username}/user/rename`,
        server: () => 
          `/${username}/user/rename/server`,
      },
    },
    auth: {
      signOut: {
        browser: () => 
          `/${username}/auth/sign-out`,
        server: () => 
          `/${username}/auth/sign-out/server`,
      },
    },

    // ...
  } as const;
}
