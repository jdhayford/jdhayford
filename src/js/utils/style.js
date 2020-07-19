import styled, { css } from 'styled-components'

export const fancyHover = (styling) => css`
  @media (hover: hover) {
    &:hover {
      ${styling}
    }
  }
  @media (hover: none) {
    &:active {
      ${styling}
    }
  }
`

export const standardShadow = `box-shadow: 4px 4px 14px 0 rgba(0, 0, 0, 0.4), -4px -4px 14px 0 rgba(255, 255, 255, 0.04);`
export const standardHoverShadow = `box-shadow: 3px 3px 14px 0 rgba(0, 0, 0, 0.8), -3px -3px 14px 0 rgba(255, 255, 255, 0.08);`

export const makeShadow = (options = {}) => {
  const {
    light = false,
    hover = false,
    inset = false,
    shallow = false,
    tiny = false,
  } = options

  const lightLight = '0.35'
  const lightDark = '0.9'

  let lightOpacity = light ? lightLight : '0.1'
  let darkOpacity = light ? lightDark : '0.9'
  let insetOption = inset ? 'inset' : ''
  let offset = hover ? '2px' : '2px'
  let spread = '8px'
  let xOffset = offset
  let yOffset = offset

  if (shallow) {
    xOffset = hover ? '2px' : '2px'
    yOffset = hover ? '1px' : '2px'
    spread = '8px'
    lightOpacity = hover ? lightLight : '0.1'
    darkOpacity = hover ? lightDark : '0.7'
  }

  if (tiny) {
    xOffset = hover ? '2px' : '2px'
    yOffset = hover ? '1px' : '2px'
    spread = '8px'
    lightOpacity = hover ? lightLight : '0.1'
    darkOpacity = hover ? lightDark : '0.7'
  }

  if (inset) {
    darkOpacity = lightDark
    lightOpacity = '0.15'
    xOffset = hover ? '5px' : '2px'
    yOffset = hover ? '5px' : '2px'
  }

  return css`
    box-shadow: ${insetOption} ${xOffset} ${yOffset} ${spread} 0 rgba(29, 29, 29, ${darkOpacity}),
      ${insetOption} -${xOffset} -${yOffset} ${spread} 0 rgba(240, 255, 255, ${lightOpacity});
  `
} 