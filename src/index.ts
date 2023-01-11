import { definePlugin } from 'sanity'
import { schema } from './schemas'

interface MyPluginConfig {
  /* nothing here yet */
}

export const colorList = definePlugin<MyPluginConfig | void>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-plugin-color-list test', config)
  return {
    name: 'sanity-plugin-color-list',
    schema: {
      types: [schema],
    },
  }
})
