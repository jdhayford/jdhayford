import { createGlobalStyle, css } from 'styled-components'
import Montserrat from '../../fonts/Montserrat/Montserrat-Regular.ttf'
import { MIST, DARK_MIST, SILVER, DARK_SILVER, MATTE_GREY, DARK_SLATE } from './Colors'
import BG from '../../images/blue-mesh-bg.jpg'
import '../../images/jh-fav.png'
import '../../images/jh-512.png'
import '../../images/jh-192.png'

const MAIN_FONT = "'Montserrat', sans-serif"

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
    background: #111;
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
`;

export default GlobalCssStyles;
