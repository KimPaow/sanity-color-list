import React, { useCallback, useState } from 'react'
import { ObjectOptions, ObjectSchemaType, ObjectInputProps, set, unset, PatchEvent } from 'sanity'
import { Card, Inline, Stack, Text } from '@sanity/ui'
import { BorderRadius, Color } from './Color'
import { useColors } from '../hooks'
import { isEqual } from '../utils'

export type StudioColorValue = {
  title: string
  value: string
}

export interface ColorListOptions extends Omit<ObjectOptions, 'columns'> {
  list?: StudioColorValue[]
  background?: string
  borderRadius?: BorderRadius
  thresholdContrast?: number
  thresholdAlpha?: number
  darken?: number
  lighten?: number
  tooltip?: boolean
}

export type ColorListSchemaType = Omit<ObjectSchemaType, 'options'> & {
  options?: ColorListOptions
}
export type ColorInputProps = ObjectInputProps<StudioColorValue, ColorListSchemaType>

export const ColorListInput = (props: ColorInputProps) => {
  const { onChange, schemaType: type, value } = props
  const { borderRadius = { inner: '100%', outer: '100%' } } = type.options || {}
  const { colors, errors } = useColors(type?.options)
  const [currentColor, setCurrentColor] = useState(value)

  const handleColorChange = useCallback(
    (nextColor: StudioColorValue) => {
      if (currentColor && isEqual(currentColor, nextColor)) {
        setCurrentColor(undefined)
        onChange(PatchEvent.from(unset()))
      } else {
        setCurrentColor(nextColor)
        onChange(PatchEvent.from(set(nextColor)))
      }
    },
    [currentColor, onChange]
  )

  let content = null

  if (errors) {
    content = (
      <Stack>
        {errors.map((error) => (
          <Card key={error} padding={4} radius={2}>
            <Text align="center" size={[2, 2, 3]}>
              sanity-plugin-color-list: {error}
            </Text>
          </Card>
        ))}
      </Stack>
    )
  }

  if (colors && !errors) {
    content = (
      <Inline space={[3, 3, 4, 4]}>
        {colors.map((color) => (
          <Color
            onClick={handleColorChange}
            radius={borderRadius}
            key={color.value}
            isActive={
              currentColor
                ? isEqual(currentColor, { value: color.value, title: color.title })
                : false
            }
            color={color}
          />
        ))}
      </Inline>
    )
  }

  return content
}
