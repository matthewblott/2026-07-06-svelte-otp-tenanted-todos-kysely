type Id = number;

export function createTenantRoutes(username: string) {
  return {
    account: {
      index: () =>
        `/${username}/account`,
      delete: {
        browser: () => 
          `/${username}/account/delete`,
        server: () => 
          `/${username}/account/delete/server`,
      },
      rename: {
        browser: () => 
          `/${username}/account/rename`,
        server: () => 
          `/${username}/account/rename/server`,
      },
      signOut: {
        browser: () => 
          `/${username}/account/sign-out`,
        server: () => 
          `/${username}/account/sign-out/server`,
      },
    },
    todos: {
      index: () => 
        `/${username}/todos`,
      new: () => 
        `/${username}/todos/new`,
      edit: (id: Id) => 
        `/${username}/todos/${id}`,
    }
    // ...
  } as const;
}
