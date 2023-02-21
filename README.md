# sanity-plugin-color-list

> This is a **Sanity Studio v3** plugin.

## Installation

```bash
npm install --save sanity-plugin-color-list@studio-v3
```

## Usage
Add it as a plugin in sanity.config.ts (or .js):

```js
 import {defineConfig} from 'sanity'
 import {myPlugin} from 'sanity-plugin-color-list'

 export const defineConfig({
     //...
     plugins: [
         myPlugin({})
     ]
 })
```
## License

[MIT](LICENSE) © Kim Björkman

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.
