import { createGlobalStyle, css } from 'styled-components'
import FreeSans from '../../fonts/FreeSans.ttf'
import FreeSansBold from '../../fonts/FreeSansBold.otf'
import Montserrat from '../../fonts/Montserrat/Montserrat-Regular.ttf'
import { MIST, DARK_MIST, SILVER, DARK_SILVER, MATTE_GREY, DARK_SLATE } from './Colors'
import BG from '../../images/blue-mesh-bg.jpg'
import '../../images/jh-fav.png'

const MAIN_FONT = "'Montserrat', sans-serif"

const SVGOverrides = css`
  svg {
    margin-bottom: -0.5rem;
  }

  circle {
    fill: ${DARK_MIST} !important;
  }

  svg > g > text {
    fill: ${DARK_MIST} !important;
    font-family: 'FreeSans';
  }

  svg > g > g:first-child > text {
    fill: ${DARK_MIST} !important;
    font-family: 'FreeSans';
    font-size: 0.3rem;
  }

  rect {
    fill: ${DARK_MIST} !important;
  }

  text {
    font-family: 'FreeSans';
    // HIDES TEXT
    fill: none !important;
  }

  path, circle:only-child {
    stroke: ${DARK_MIST} !important;
    fill: ${DARK_MIST} !important;
  }
`;

const GlobalCssStyles = createGlobalStyle`

html {
  touch-action: manipulation;
  -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
  -webkit-tap-highlight-color: transparent !important;
}

  @font-face {
    font-family: 'Montserrat';
    src: url('${Montserrat}') format('truetype');
  }

  body {
    font-family: ${MAIN_FONT};
    ${'' /* background: linear-gradient(90deg, rgba(40,45,53,1) 5%, rgba(31,32,37,1) 87%); */}
    ${'' /* background: linear-gradient(178deg, rgb(57,62,68) 5%,rgb(46,46,53) 87%); */}
    background: #111;
    ${'' /* background: linear-gradient(178deg, rgb(31,33,35) 5%,rgb(26,26,29) 87%); */}
    ${'' /* background: linear-gradient(178deg, rgb(18,20,23) 5%, #111 87%); */}
    color: ${DARK_MIST};
    background: url(${BG});
    background-size: cover;
    background-image: linear-gradient( 135deg, #5EFCE8 10%, #736EFE 100%);
    color: azure;
    margin: 0;
    min-height: 100vh;
    ${'' /* width: 100vw; */}
  }

  .tether-element {
    z-index: 1000;
  }

  ${SVGOverrides}
`;

export default GlobalCssStyles;
