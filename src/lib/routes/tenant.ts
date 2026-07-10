type Id = number;

export function createTenantRoutes(username: string) {
  return {
    account: {
      index: () =>
        `/${username}/account`,
      delete: () => 
        `/${username}/account/delete`,
      rename: () => 
        `/${username}/account/rename`,
      signOut: () => 
        `/${username}/account/sign-out`,
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
