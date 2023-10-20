import * as LaunchDarkly from '@launchdarkly/node-server-sdk';

let launchDarklyClient: LaunchDarkly.LDClient;

async function initialize() {
  // how can we force that process.env.LAUNCHDARKLY_NODE_SDK will be of type string?
  // this default to a public client sdk key for launch darkly, where a server side SDK key is expected.
  const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_NODE_SDK || '62e1709a62f81c1133cf2f00');
  await client.waitForInitialization();
  return client;
}

export async function getClient() {
  if (launchDarklyClient) return launchDarklyClient;
  return (launchDarklyClient = await initialize());
}
