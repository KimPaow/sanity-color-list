import { TinyColor } from '@ctrl/tinycolor'
import { useEffect, useState } from 'react'
import { ColorListOptions, StudioColorValue } from '../components/ColorListInput'
import { useBackground } from './useBackground'
// import { checkEqual, getColorString, getStaticKey } from './helpers'

export type ColorInfo = StudioColorValue & { tc: TinyColor; decorator: TinyColor }

export const useColors = (
  options?: ColorListOptions
): { colors: ColorInfo[]; errors?: string[] } => {
  const [colors, setColors] = useState<ColorInfo[]>([])
  const [errors, setErrors] = useState<string[]>()
  const { bgBrightness, bgAccentColor } = useBackground(options)

  useEffect(() => {
    const {
      list,
      thresholdContrast = 20,
      thresholdAlpha = 0.2,
      darken = 10,
      lighten = 10,
    } = options || {}

    if (!list || !Array.isArray(list)) {
      setErrors((state) => [...(state || []), '"list" option is not an array'])
      return
    }

    const _colors = list.reduce<ColorInfo[]>((acc, color) => {
      if (!color.value) {
        setErrors((state) => [...(state || []), 'Could not find a color value'])
        return acc
      }

      const tc = new TinyColor(color.value)

      if (!tc.isValid) {
        setErrors((state) => [...(state || []), `Could not process the format of ${color.value}`])
        return acc
      }

      const isLowContrast = Math.abs(bgBrightness - tc.getBrightness()) <= thresholdContrast
      const isLowAlpha = tc.getAlpha() < thresholdAlpha

      let decoratorColor = tc

      if (isLowContrast) {
        decoratorColor = tc.isLight() ? tc.darken(darken) : tc.lighten(lighten)
      }

      if (isLowAlpha) {
        decoratorColor = bgAccentColor
      }

      return [...acc, { value: color.value, title: color.title, tc, decorator: decoratorColor }]
    }, [])

    setColors(_colors)
  }, [bgAccentColor, bgBrightness, options])

  return {
    colors,
    errors,
  }
}
