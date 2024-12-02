import { createHash } from 'crypto';

export const encryptPassword = (password: string): string => {
  return createHash('sha256').update(password).digest('hex');
};

// The encrypted value of '070605'
export const ENCRYPTED_PASSWORD = '7c4a8d09ca3762af61e59520943dc26494f8941b'; // This is just an example hash, actual hash will be different
