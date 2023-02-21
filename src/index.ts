import { definePlugin } from 'sanity'
import { schema } from './schemas'

interface MyPluginConfig {
  /* nothing here yet */
}

export const colorList = definePlugin<MyPluginConfig | void>((config = {}) => {
  return {
    name: 'sanity-plugin-color-list',
    schema: {
      types: [schema],
    },
  }
})
