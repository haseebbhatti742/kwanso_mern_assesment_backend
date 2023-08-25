import crypto from "crypto"

export const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export const verifyPassword = (password: string, hashedPassword: string, ): boolean => {
  return hashedPassword === hashPassword(password)
}