import styled, {css} from 'styled-components'
import React from 'react'
import {Tooltip, Box, Text} from '@sanity/ui'

export const List = styled.ul`
  padding: 0;
  margin: 0 15px 0 0;
  /* display: flex; */
  /* flex-wrap: wrap; */
  border-radius: 2px;

  ${props => {
    if (props.hasError) {
      const {color} = props?.theme?.sanity || {}
      return css`
        border-left: 2px solid  ${color.solid.critical.enabled.border};
        padding-left: 15px;
      `
    }
    return ''
  }}
`

export const ListItem = styled.li`
  display: inline-block;
  margin-right: 10px;
  border-radius: 100%;
  box-sizing: border-box;
  position: relative;
  height: 38px;
  width: 38px;
  border-color: ${props => props.decoratorColor};

  &:hover > * {
    width: ${props => (props.isActive ? '26px' : '34px')};
    height: ${props => (props.isActive ? '26px' : '34px')};
    cursor: pointer;
  }

  ${props => props.isActive && css`
    border-width: 2px;
    border-style: solid;
  `}
`

export const Pattern = styled.div`
  border-radius: 100%;
  height: 36px;
  width: 36px;
  display: block;
  margin: 0;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: linear-gradient(
      45deg,
      rgba(156, 168, 189, 0.15) 25%,
      transparent 25%
    ),
    linear-gradient(-45deg, rgba(156, 168, 189, 0.15) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(156, 168, 189, 0.15) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(156, 168, 189, 0.15) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
  background-position-x: 0px, 0px, 10px, -10px;
  background-position-y: 0px, 10px, -10px, 0px;

  ${props => props.isActive && css`
    width: 28px;
    height: 28px;
  `}
`

export const Color = styled.input`
  border-radius: ${props => props.radius};
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
  background-color: ${props => props.fillColor};

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
      border-radius: ${props => props.radius};

      ${props => {
    const {color} = props?.theme?.sanity || {}
    return css`
          box-shadow: 0px 0px 0px 2px ${color.base.focusRing};
        `
  }}
    }
  }

  ${props => props.hasOutline && css`
    box-shadow: inset 0px 0px 0px 1px ${props.outlineColor};
  `}

  ${props => props.isActive && css`
    width: 28px;
    height: 28px;
  `}
`

export const ConditionalWrapper = ({condition, wrapper, children}) => {
  if (condition) {
    return wrapper(children)
  }
  return children
}

export const ToolTip = props => {
  return (
    <Tooltip
      content={(
        <Box padding={2}>
          <Text size={1}>{props.title}</Text>
        </Box>
      )}
      placement="top"
      {...props}
    />
  )
}
