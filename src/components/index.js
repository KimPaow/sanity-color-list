import styled, {css} from 'styled-components'

export const ListItem = styled.li`
  display: inline-block;
  margin-right: 10px;
  border-radius: 100%;
  box-sizing: border-box;
  position: relative;
  height: 38px;
  width: 38px;
  border-color: ${props => props.color};

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
  }

  ${props => props.hasOutline && css`
    box-shadow: inset 0px 0px 0px 1px ${props.outlineColor};
  `}

  ${props => props.isActive && css`
    width: 28px;
    height: 28px;
  `}
`
