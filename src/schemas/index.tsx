import { ColorListInput, ColorListOptions } from '../components/ColorListInput'
import { defineType, ObjectDefinition } from 'sanity'

const colorTypeName = 'colorlist' as const

/**
 * @public
 */
export interface ColorDefinition extends Omit<ObjectDefinition, 'type' | 'fields' | 'options'> {
  type: typeof colorTypeName
  options?: ColorListOptions
}

declare module '@sanity/types' {
  // makes type: 'color' narrow correctly when using defineTyp/defineField/defineArrayMember
  export interface IntrinsicDefinitions {
    colorlist: ColorDefinition
  }
}

export const schema = defineType({
  name: colorTypeName,
  type: 'object',
  title: 'Color',
  ...({ components: { input: ColorListInput } } as {}),
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'value',
      type: 'string',
    },
  ],
})
