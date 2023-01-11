import { TinyColor } from '@ctrl/tinycolor'
import styled, { css } from 'styled-components'

export interface ColorInnerProps {
  isActive: boolean
  radius: string
  colorFill: TinyColor
  colorOutline: TinyColor
  hasOutline: boolean
}

export const ColorInner = styled.div<ColorInnerProps>`
  border-radius: ${(props) => props.radius};
  appearance: none;
  height: 36px;
  width: 36px;
  display: block;
  margin: 0;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.colorFill?.toRgbString()};
  &:focus {
    outline: none;
    &:before {
      content: '';
      position: absolute;
      height: 34px;
      width: 34px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: ${(props) => props.radius};
      ${(props) => {
        const { color } = props?.theme?.sanity || {}
        return css`
          box-shadow: 0px 0px 0px 2px ${color.base.focusRing};
        `
      }}
    }
  }
  ${(props) =>
    props.hasOutline &&
    css`
      box-shadow: inset 0px 0px 0px 1px ${props.colorOutline?.toHexString()};
    `}
  ${(props) =>
    props.isActive &&
    css`
      width: 28px;
      height: 28px;
    `}
`
