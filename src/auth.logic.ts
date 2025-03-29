import { createUser, getUserProfile } from './user.logic';

export function registerIfNewUser(principal: string, name: string, email: string) {
  const existing = getUserProfile(principal);
  if (existing.success) {
    return { success: false, message: 'User already exists' };
  }
  return createUser(principal, name, email);
}

export function isAuthenticated(principal: string) {
  const existing = getUserProfile(principal);
  return existing.success;
}