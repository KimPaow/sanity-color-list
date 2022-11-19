import {definePlugin} from 'sanity'

interface MyPluginConfig {
  /* nothing here yet */
}

/**
 * ## Usage in sanity.config.ts (or .js)
 *
 * ```
 * import {defineConfig} from 'sanity'
 * import {myPlugin} from 'sanity-plugin-color-list'
 *
 * export const defineConfig({
 *     //...
 *     plugins: [
 *         myPlugin()
 *     ]
 * })
 * ```
 */
export const myPlugin = definePlugin<MyPluginConfig | void>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-plugin-color-list')
  return {
    name: 'sanity-plugin-color-list',
  }
})
