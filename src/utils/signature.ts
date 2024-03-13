import crypto from 'crypto';

const key = process.env.NEXT_PUBLIC_CRYPTO_KEY;

export const getSignature = (plaintext: string) => {
  if (!key) return;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

  let encrypted = cipher.update(plaintext, 'utf-8', 'base64');
  encrypted += cipher.final('base64');

  return iv.toString('base64') + encrypted;
};
