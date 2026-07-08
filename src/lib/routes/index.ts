import { publicRoutes } from './public';
import { createTenantRoutes } from './tenant';

export function createRoutes(username?: string) {
  return {
    ...publicRoutes,
    ...(username ? createTenantRoutes(username) : {}),
  };
}

export { publicRoutes };
