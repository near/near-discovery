declare module 'near-social-vm';

declare module 'nanoid' {
  export function nanoid(size?: number): string;
}

declare module 'recharts';

interface Window {
  zE: (name: string, method: string) => void | undefined;
  Telegram: {
    Login: {
      auth: any;
    };
  };
}
