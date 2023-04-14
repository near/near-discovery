# NEAR Discovery (BOS)

## Setup & Development

Initialize repo:

```
yarn
```

Start development version:

```
yarn start
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

2. Create a `.env` file and set the component server URL as `LOCAL_COMPONENT_LOADER`
3. Run server in dev mode with `yarn start`

Note: there is no hot reload, you must refresh the page to see component changes

## Local VM Development

If you need to make changes to the VM and test locally, you can easily link your local copy of the VM:

1. Clone the viewer repo as a sibling of `near-discovery-alpha`:

```
git clone git@github.com:NearSocial/VM.git
```

Folder Structure:

```
/near-discovery-alpha
/VM
```

2. Initialize the `VM` repo and run the link command:

```
cd VM
yarn
yarn link
yarn build
```

3. Run the link command inside `near-discovery-alpha` and start the app:

```
cd ../near-discovery-alpha
yarn link "near-social-vm"
yarn start
```

4. Any time you make changes to the `VM`, run `yarn build` inside the `VM` project in order for the viewer project to pick up the changes.
