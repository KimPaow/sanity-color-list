import ColorList from '../lib'

export default {
  title: 'Colors',
  name: 'colorlist',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string'
    },
    {
      name: 'value',
      type: 'string'
    },
  ],
  inputComponent: ColorList
}
