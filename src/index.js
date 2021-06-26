/* eslint-disable complexity */
import { TinyColor } from '@ctrl/tinycolor'
import { studioTheme, ThemeProvider } from '@sanity/ui'
import { uniqueId } from 'lodash'
import FormField from 'part:@sanity/components/formfields/default?'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event?'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import { Color, ConditionalWrapper, List, ListItem, Pattern, ToolTip } from './components'
import { checkEqual, getColorString, getStaticKey } from './helpers'

const handleChange = ({ prevValue, newValue, onChange }) => {
    if (checkEqual(newValue, prevValue)) {
        onChange(PatchEvent.from(unset()))
    } else {
        onChange(PatchEvent.from(set(newValue)))
    }
}

const createColors = ({ type, activeValue, name, options, onChange, onFocus, readOnly }) => {
    const {
        list = [],
        tooltip,
        borderradius,
        background = '#FFFFFF',
        contrastcutoff = 20,
        lighten = 10,
        darken = 10,
        opacityThreshold = 0.2,
    } = options || []
    const { inner = '100%', outer = '100%' } = borderradius || {}
    const bg = new TinyColor(background)
    const bgBrightness = bg?.getBrightness() || 255
    const bgAccent = bg?.isLight() ? bg?.darken(darken) : bg?.lighten(lighten)

    let colorList = list
    if (list instanceof Function) {
        colorList = list()
    }

    if (!colorList) {
        // eslint-disable-next-line no-console
        console.warn('[color-list] No color values found, aborting.')
        return null
    }

    return colorList.map((color, i) => {
        if (!color.value) {
            // eslint-disable-next-line no-console
            console.error('sanity-plugin-color-list could not find a color value. Please check your schema.')
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

        const displayColor = getColorString({
            tinycolor: currentColor,
            color: color.value,
        })
        const isActive = checkEqual(activeValue, color)

        let decoratorColor = currentColor.isLight() ? currentColor.darken(darken) : currentColor.lighten(lighten)
        decoratorColor = isLowAlpha ? bgAccent : decoratorColor

        return (
            <ConditionalWrapper
                key={getStaticKey(displayColor + i)}
                condition={tooltip}
                wrapper={children => <ToolTip title={color.title}>{children}</ToolTip>}
            >
                <ListItem
                    isActive={isActive}
                    decoratorColor={isLowContrast || isLowAlpha ? decoratorColor : displayColor}
                    radius={outer}
                >
                    <Pattern isActive={isActive} />
                    <Color
                        type="radio"
                        role="radio"
                        name={name}
                        aria-label={color.title}
                        aria-checked={isActive}
                        tabindex={isActive || (!activeValue && i === 0) ? '0' : '-1'}
                        disabled={readOnly}
                        checked={isActive}
                        value={color}
                        onChange={() =>
                            handleChange({
                                prevValue: activeValue,
                                newValue: color,
                                onChange,
                            })
                        }
                        onClick={() =>
                            handleChange({
                                prevValue: activeValue,
                                newValue: color,
                                onChange,
                            })
                        }
                        onKeyPress={event =>
                            event.key === 'Enter' &&
                            handleChange({
                                prevValue: activeValue,
                                newValue: color,
                                onChange,
                            })
                        }
                        onFocus={onFocus}
                        isActive={isActive}
                        radius={inner}
                        hasOutline={isLowContrast || isLowAlpha}
                        outlineColor={decoratorColor}
                        fillColor={displayColor}
                    />
                </ListItem>
            </ConditionalWrapper>
        )
    })
}

const ColorList = forwardRef((props, ref) => {
    const { onChange, level, value, type, readOnly, markers, onFocus, presence } = props
    const validation = markers.filter(marker => marker.type === 'validation')
    const errors = validation.filter(marker => marker.level === 'error')
    const groupName = uniqueId('ColorList')

    return (
        <FormField
            label={type.title}
            description={type.description}
            level={level}
            labelFor={groupName}
            markers={markers}
            presence={presence}
            onFocus={onFocus}
        >
            <ThemeProvider theme={studioTheme}>
                <List ref={ref} role="radiogroup" hasError={errors.length > 0}>
                    {createColors({
                        type,
                        activeValue: value,
                        name: groupName,
                        options: type.options,
                        onChange,
                        onFocus,
                        readOnly,
                    })}
                </List>
            </ThemeProvider>
        </FormField>
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
            tooltip: PropTypes.bool,
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
        title: PropTypes.string,
    }),
    onChange: PropTypes.func.isRequired,
    readOnly: PropTypes.bool,
    onFocus: PropTypes.func,
    markers: PropTypes.array,
    presence: PropTypes.array,
}

ColorList.defaultProps = {
    level: undefined,
    value: undefined,
    onChange: undefined,
    readOnly: undefined,
    onFocus: undefined,
    onBlur: undefined,
    markers: undefined,
    presence: undefined,
}

export default ColorList
