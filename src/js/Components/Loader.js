import React from 'react'
import styled, { keyframes } from 'styled-components'

import { CARBON } from '../utils/Colors'
import SongTonicLogo from '../../images/mint-soundhole.png'

const Logo = styled.img.attrs(() => ({ src: SongTonicLogo }))`
  width: 3rem;
`

const slide = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(3.8rem);
  }
`;

const Blocker = styled.div`
  position: absolute;
  width: 0.4rem;
  height: 3.5rem;
  background-color: #32363b;
  margin-left: -0.6rem;

  animation: ${slide} 1s linear infinite alternate;
`

const Container = styled.div`
`

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${props => props.absolute && 'height: 100vh;'}
`

export const Loader = (props) => {
  const { absolute = false } = props
  return (
    <LoaderWrapper absolute={absolute}>
      <Container>
        <Blocker />
        <Logo />
      </Container>
    </LoaderWrapper>
  )
}


export const PageLoader = (props) => <Loader absolute {...props} />
