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

1. Run an instance of a component server like [near/bos-loader](https://github.com/near/bos-loader) which serves component code in the following format

   ```json
   {
     "components": {
       "<component path 1>": {
         "code": "<component 1 code>"
       },
       "<component path 2>": {
         "code": "<component 2 code>"
       }
     }
   }
   ```

   this will be used as a `redirectMap` in `ViewPage`

2. Open the `/flags` route of your viewer and set the BOS Loader URL e.g. `http://127.0.0.1:3030`

Note: there is no hot reload, you must refresh the page to see component changes

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
