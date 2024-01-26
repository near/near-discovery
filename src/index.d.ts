declare module 'near-social-vm';

declare module 'nanoid' {
  export function nanoid(size?: number): string;
}

interface Window {
  zE: (name: string, method: string) => void | undefined;
}

interface ExperimentalNaviagtor extends Navigator {
  readonly userAgentData?: NavigatorUAData;
}

// https://wicg.github.io/ua-client-hints/#navigatoruadata
interface NavigatorUAData extends UALowEntropyJSON {
  getHighEntropyValues(hints: string[]): Promise<UADataValues>;
}
