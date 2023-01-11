import styled, { css } from 'styled-components'

export interface AlphaPatternProps {
  isActive: boolean
}

// TODO: Is it okay that this size is fixed?
export const AlphaPattern = styled.div<AlphaPatternProps>`
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
  background-image: linear-gradient(45deg, rgba(156, 168, 189, 0.15) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(156, 168, 189, 0.15) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(156, 168, 189, 0.15) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(156, 168, 189, 0.15) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
  background-position-x: 0px, 0px, 10px, -10px;
  background-position-y: 0px, 10px, -10px, 0px;

  ${(props) =>
    props.isActive &&
    css`
      width: 28px;
      height: 28px;
    `}
`
