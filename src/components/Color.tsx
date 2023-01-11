import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { ColorInfo } from '../hooks'
import { AlphaPattern } from './AlphaPattern'
import { ColorInner } from './ColorInner'
import { StudioColorValue } from './ColorListInput'

export interface BorderRadius {
  outer: string
  inner: string
}

interface ColorContainerProps {
  colorInfo: ColorInfo
  isActive: boolean
  radius: string
}

interface ColorProps {
  onClick: (nextColor: StudioColorValue) => void
  color: ColorInfo
  isActive: boolean
  radius: BorderRadius
}

const sizes = {
  sm: '26px',
  md: '34px',
  lg: '38px',
}

export const ColorContainer = styled.div<ColorContainerProps>`
  height: ${sizes.lg};
  width: ${sizes.lg};
  position: relative;
  border-color: transparent;
  border-radius: ${(props) => props.radius};
  border-width: 2px;
  border-style: solid;
  transition: height 150ms ease-in-out, width 150ms ease-in-out;

  &:hover > * {
    width: ${(props) => (props.isActive ? sizes.sm : sizes.md)};
    height: ${(props) => (props.isActive ? sizes.sm : sizes.md)};
    transition: height 150ms ease-in-out, width 150ms ease-in-out;
    cursor: pointer;
  }

  ${(props) =>
    props.isActive &&
    css`
      border-color: ${props.colorInfo.decorator.toHexString()};
    `}
`

export const Color = ({ isActive, radius, color, onClick }: ColorProps) => {
  const handleClick = useCallback(
    () => onClick({ value: color.value, title: color.title }),
    [color.title, color.value, onClick]
  )

  return (
    <ColorContainer
      colorInfo={color}
      isActive={isActive}
      radius={radius.outer}
      onClick={handleClick}
    >
      <AlphaPattern isActive={isActive} />
      <ColorInner
        isActive={isActive}
        radius={radius.inner}
        colorFill={color?.tc}
        colorOutline={color?.decorator}
        hasOutline
      />
    </ColorContainer>
  )
}
