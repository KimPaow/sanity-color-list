import { useTheme } from '@sanity/ui'
import { TinyColor } from '@ctrl/tinycolor'
import { ColorListOptions } from '../components/ColorListInput'
import { useEffect, useState } from 'react'

type State = {
  /** A number 0-255 that represents the Sanity Studio background brightness */
  bgBrightness: number
  /** A lighter / darker version of the Sanity Studio background color */
  bgAccentColor: TinyColor
}

/**
 * Handles information about the Sanity Studio background color
 */
export const useBackground = (options?: ColorListOptions): State => {
  const theme = useTheme()
  const [background, setBackground] = useState<State>({
    bgBrightness: 125,
    bgAccentColor: new TinyColor(theme.sanity.color.base.bg).darken(options?.darken || 10),
  })

  useEffect(() => {
    if (!options) {
      return
    }
    const { darken = 10, lighten = 10 } = options || {}
    const bg = new TinyColor(theme.sanity.color.base.bg || '#444')
    const bgBrightness = bg?.getBrightness() ?? 255
    const bgAccentColor = bg?.isLight() ? bg?.darken(darken) : bg?.lighten(lighten)

    setBackground({ bgBrightness, bgAccentColor })
  }, [options, theme])

  return background
}
