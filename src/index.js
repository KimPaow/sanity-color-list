/* eslint-disable complexity */
import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import FormField from 'part:@sanity/components/formfields/default?'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event?'
import {getStaticKey} from './helpers'
import {TinyColor} from '@ctrl/tinycolor'
import {ListItem, Pattern, Color} from './components'
import {Inline, studioTheme, ThemeProvider} from '@sanity/ui'

const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(value))

const handleClick = (activeValue, selectedColor, onChange) => {
  // unset if you select same color twice
  if (selectedColor === activeValue) {
    onChange(createPatchFrom(''))
  } else {
    onChange(createPatchFrom(selectedColor.toString()))
  }
}

const getDisplayColor = ({tinycolor, color = {}}) => {
  if (typeof color.value === 'object') {
    return tinycolor.toRgbString()
  }

  return color.value
}

const createColors = (activeValue, options, onChange) => {
  const {
    list = [],
    borderradius,
    background = '#FFFFFF',
    contrastcutoff = 20,
    lighten = 10,
    darken = 10,
    opacityThreshold = 0.2
  } = options || []
  const {inner = '100%', outer = '100%'} = borderradius || {}
  const bg = new TinyColor(background)
  const bgBrightness = bg?.getBrightness() || 255
  const bgAccent = bg?.isLight() ? bg?.darken(darken) : bg?.lighten(lighten)

  return list.map((color, i) => {
    if (!color.value) {
    // eslint-disable-next-line no-console
      console.error(
        'sanity-plugin-color-list could not find a color value. Please check your schema.'
      )
      return null
    }
    const currentColor = new TinyColor(color.value)
    if (!currentColor.isValid) {
    // eslint-disable-next-line no-console
      console.error(
        `sanity-plugin-color-list could not recognize the color: ${color.value}. Perhaps try another format.`
      )
      return null
    }

    const rgbString = currentColor.toRgbString()
    const isLowContrast = Math.abs(bgBrightness - currentColor.getBrightness()) <= contrastcutoff
    const isLowAlpha = currentColor.getAlpha() < opacityThreshold

    // update these... since new value is object, not string
    const displayColor = getDisplayColor({
      tinycolor: currentColor,
      color: color,
    })
    const isObj = typeof color.value === 'object'
    const isActive = isObj ? activeValue === rgbString : activeValue === color.value.toString()

    let decoratorColor = currentColor.isLight() ? currentColor.darken(darken) : currentColor.lighten(lighten)
    // if opacity is low, use a specific color which contrasts with bg instead
    decoratorColor = isLowAlpha ? bgAccent : decoratorColor

    return (
      <ListItem
        key={getStaticKey(displayColor)}
        isActive={isActive}
        color={(isLowContrast || isLowAlpha) ? decoratorColor : displayColor}
        radius={outer}
      >
        <Pattern
          isActive={isActive}
        />
        <Color
          isActive={isActive}
          fillColor={displayColor}
          radius={inner}
          hasOutline={isLowContrast || isLowAlpha}
          outlineColor={decoratorColor}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => handleClick(activeValue, isObj ? rgbString : color.value.toString(), onChange)}
        />
      </ListItem>
    )
  })
}

const ColorPicker = forwardRef(({onChange, level, value, type, ...props}, ref) => {
  const {title, description, options} = type || {}
  return (
    <ThemeProvider theme={studioTheme}>
      <FormField
        label={title}
        description={description}
        level={level}
      >
        <Inline space={[2, 2, 3]} style={{padding: 0, marginRight: '15px'}} as="ul" ref={ref}>{createColors(value, options, onChange)}</Inline>
      </FormField>
    </ThemeProvider>
  )
})

ColorPicker.displayName = 'ColorList'

ColorPicker.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.shape({
      background: PropTypes.string,
      borderradius: PropTypes.shape({
        outer: PropTypes.string,
        inner: PropTypes.string,
      }),
      contrastcutoff: PropTypes.number,
      lighten: PropTypes.number,
      darken: PropTypes.number,
      list: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        })
      ),
    }).isRequired,
  }).isRequired,
  level: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default ColorPicker
