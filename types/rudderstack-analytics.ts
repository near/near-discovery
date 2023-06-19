export interface IntegrationOptions {
    All?: boolean;
    [index: string]: boolean | undefined | ApiObject;
}

export interface QueueOptions {
    maxRetryDelay?: number;
    minRetryDelay?: number;
    backoffFactor?: number;
    maxAttempts?: number;
    maxItems?: number;
}

export interface BeaconQueueOptions {
    maxItems?: number;
    flushQueueInterval?: number;
}

export interface OneTrust {
    enabled: boolean;
}

export interface CookieConsentManager {
    oneTrust?: OneTrust;
}

export interface AutoCapture {
    enabled?: boolean;
    source?: string;
}

export interface AnonymousIdOptions {
    autoCapture?: AutoCapture;
}

export enum RESIDENCY_SERVER {
    US = 'US',
    EU = 'EU',
}

export interface LoadOptions {
    integrations?: IntegrationOptions;
    configUrl?: string;
    queueOptions?: QueueOptions;
    loadIntegration?: boolean;
    lockIntegrationsVersion?: boolean;
    secureCookie?: boolean;
    sameSiteCookie?: string;
    logLevel?: string;
    getSourceConfig?: () => string | ApiObject | Promise<ApiObject> | Promise<string>;
    setCookieDomain?: string;
    sendAdblockPage?: boolean;
    sendAdblockPageOptions?: ApiOptions;
    clientSuppliedCallbacks?: { string: () => void };
    useBeacon?: boolean;
    beaconQueueOptions?: BeaconQueueOptions;
    cookieConsentManager?: CookieConsentManager;
    anonymousIdOptions?: AnonymousIdOptions;
    destSDKBaseURL?: string;
    sessions?: {
        autoTrack?: boolean;
        timeout?: number;
    };
    residencyServer?: RESIDENCY_SERVER;
    polyfillIfRequired?: boolean;
    uaChTrackLevel?: 'none' | 'default' | 'full';
    onLoaded?: (analytics: any) => void;
    useGlobalIntegrationsConfigInEvents?: boolean;
}

export interface ApiObject {
    [index: string]:
    | string
    | number
    | boolean
    | ApiObject
    | (string | number | boolean | ApiObject)[]
    | undefined
    | null;
}

export interface ApiOptions {
    integrations?: IntegrationOptions;
    anonymousId?: string;
    originalTimestamp?: string;
    [index: string]:
      | string
      | number
      | boolean
      | ApiObject
      | (string | number | boolean | ApiObject)[]
      | IntegrationOptions
      | undefined;
}

export type ApiCallback = () => void;

export default interface Analytics {
  load(writeKey: string, dataPlaneUrl: string, options?: LoadOptions): void;
  ready(callback: ApiCallback): void;
  page(
    category?: string, 
    name?: string, 
    properties?: ApiObject, 
    callback?: ApiCallback, 
  ): void;
  track(
    event: string, 
    properties?: ApiObject, 
    apiOptions?: ApiOptions, 
    callback?: ApiCallback
  ): void;
  identify(
    userId?: string, 
    traits?: ApiObject, 
    callback?: ApiCallback,
    apiOptions?: ApiOptions, 
  ): void;
  alias(
    to: string, 
    from?: string, 
    apiOptions?: ApiOptions, 
    callback?: ApiCallback
  ): void;
  group(
    groupId?: string, 
    traits?: ApiObject, 
    apiOptions?: ApiOptions, 
    callback?: ApiCallback
  ): void;
  getAnonymousId(options?: AnonymousIdOptions): string;
  setAnonymousId(anonymousId?: string, rudderAmpLinkerParm?: string): void;
  reset(flag?: boolean): void;
  getUserId(): string;
  getUserTraits(): ApiObject;
  getGroupId(): string;
  getGroupTraits(): ApiObject;
  startSession(sessionId?: number): void;
  endSession(): void;
  getSessionId(): number | null;
}

