/* eslint-disable complexity */
import React, {forwardRef} from 'react'
import PropTypes from 'prop-types'
import FormField from 'part:@sanity/components/formfields/default?'
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event?'
import {getStaticKey} from './helpers'
import {isEqual} from 'lodash'
import {TinyColor} from '@ctrl/tinycolor'
import {ListItem, Pattern, Color} from './components'
import {studioTheme, ThemeProvider} from '@sanity/ui'

const createPatchFrom = value => PatchEvent.from(value === '' ? unset() : set(value))

const handleChange = ({prevValue, newValue, onChange}) => {
  if (newValue === prevValue) {
    onChange(createPatchFrom(undefined))
  } else {
    onChange(createPatchFrom(newValue))
  }
}

const getDisplayColor = ({tinycolor, color = {}}) => {
  if (typeof color === 'object') {
    return tinycolor.toRgbString()
  }

  return color
}

const createColors = (activeValue, name, options, onChange) => {
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

    const isLowContrast = Math.abs(bgBrightness - currentColor.getBrightness()) <= contrastcutoff
    const isLowAlpha = currentColor.getAlpha() < opacityThreshold

    const displayColor = getDisplayColor({
      tinycolor: currentColor,
      color: color.value,
    })
    const isActive = isEqual(activeValue, color)

    let decoratorColor = currentColor.isLight() ? currentColor.darken(darken) : currentColor.lighten(lighten)
    decoratorColor = isLowAlpha ? bgAccent : decoratorColor
    color.value = displayColor

    return (
      <ListItem
        key={getStaticKey(displayColor + i)}
        isActive={isActive}
        color={(isLowContrast || isLowAlpha) ? decoratorColor : displayColor}
        radius={outer}
      >
        <Pattern
          isActive={isActive}
        />
        <Color
          type="radio"
          role="radio"
          name={name}
          aria-label={color.title}
          checked={isActive}
          aria-checked={isActive}
          value={color}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={() => handleChange({prevValue: activeValue, newValue: color, onChange})}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => handleChange({prevValue: activeValue, newValue: color, onChange})}
          isActive={isActive}
          radius={inner}
          hasOutline={isLowContrast || isLowAlpha}
          outlineColor={decoratorColor}
          fillColor={displayColor}
        />
      </ListItem>
    )
  })
}

const ColorList = forwardRef(({onChange, level, value, type}, ref) => {
  const {title, description, options, name} = type || {}
  const groupName = getStaticKey(name)
  return (
    <ThemeProvider theme={studioTheme}>
      <FormField
        label={title}
        description={description}
        level={level}
      >
        <ul style={{padding: 0, marginRight: '15px'}} ref={ref} role="radiogroup">
          {createColors(value, groupName, options, onChange)}
        </ul>
      </FormField>
    </ThemeProvider>
  )
})

ColorList.displayName = 'ColorList'

ColorList.propTypes = {
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
  level: PropTypes.number,
  value: PropTypes.shape({
    value: PropTypes.string,
    title: PropTypes.string
  }),
  onChange: PropTypes.func.isRequired,
}

ColorList.defaultProps = {
  level: undefined,
  value: undefined,
  onChange: undefined
}

export default ColorList
