# NEAR Discovery (BOS)

## Setup & Development

_This repo requires [pnpm](https://pnpm.io/installation)._

Initialize repo:

```
pnpm i
```

Start development version:

```
pnpm dev
```

## Local Component Development

To start local component development you need to follow this steps:

1. Run commands as mentioned in [Setup & Development](#setup--development).

2. Navigate to [near-discovery-components](https://github.com/near/near-discovery-components) and follow [Local development with BOS-Loader](https://github.com/near/near-discovery-components/blob/develop/CONTRIBUTING.md#local-development-with-bos-loader) section.

3. *(optional)* Make a copy of `".env.example"` called `".env.local"`. **`NEXT_PUBLIC_NETWORK_ID`** allows you to choose working environment.

*Note:* The **`NEXT_PUBLIC_NETWORK_ID`** value should be the same as chosen working environment in `near-discovery-components`. More about [environments](https://github.com/near/near-discovery-components/blob/develop/CONTRIBUTING.md#testing-across-multiple-environments).


## Local VM Development

If you need to make changes to the VM and test locally, you can link your local copy of the VM:

1. Clone the VM repo as a sibling of `near-discovery`:

```
git clone git@github.com:NearSocial/VM.git
```

Folder Structure:

```
/near-discovery
/VM
```

2. Make sure both directories are running the exact same version of Node. You can check by running `node --version`.
3. If you haven't already, run `pnpm i` inside `near-discovery`
4. Open `near-discovery/next.config.js` and modify by adding `experimental: { esmExternals: 'loose', },` to the root of `const nextConfig = { ... }`
5. Inside `near-discovery`, run `pnpm link ../VM`
6. Inside `VM` directory, run `rm -rf node_modules pnpm-lock.yaml`, then run `yarn`, then run `yarn build`
7. Inside `near-discovery`, run `pnpm dev`
8. Any time you make changes to the `VM`, run `yarn build` inside the `VM` project in order for the gateway project to pick up the changes

To revert out of local development mode for the VM:

1. Inside `near-discovery`, run `pnpm unlink ../VM`
2. Revert the changes to `near-discovery/next.config.js`
3. Restart `pnpm dev`
