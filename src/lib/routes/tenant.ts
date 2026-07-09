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
      signOut: {
        browser: () => 
          `/${username}/user/sign-out`,
        server: () => 
          `/${username}/user/sign-out/server`,
      },
    },
    // ...
  } as const;
}
