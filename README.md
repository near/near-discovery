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

> This section needs testing since switch to pnpm

If you need to make changes to the VM and test locally, you can easily link your local copy of the VM:

1. Clone the VM repo as a sibling of `near-discovery`:

```
git clone git@github.com:NearSocial/VM.git
```

Folder Structure:

```
/near-discovery
/VM
```

2. Run `pnpm link ../VM`

3. Any time you make changes to the `VM`, run `pnpm build` inside the `VM` project in order for the viewer project to pick up the changes
