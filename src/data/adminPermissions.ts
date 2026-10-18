import { UserRole } from '../types';

export const canAccessAdminPanel = (role: UserRole) =>
  role === 'admin' || role === 'superadmin' || role === 'author';
