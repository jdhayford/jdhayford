import React from 'react'
import styled, { css } from 'styled-components'
import { useRouter } from 'next/router'
import NavLink from '../utils/Link'

import * as Colors from '../utils/Colors'

const Wrapper = styled.div`
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: stretch;

    max-width: 44rem;

    margin: 2rem auto;

    @media only screen and (max-width: 700px) {
        max-width: 95%;
        margin: 1rem auto;
    }
`

const Logo = styled.img`
    display: flex;
    height: 3rem;
    margin-right: 2rem;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 5rem;
`

const Option = styled(NavLink)`
  flex: 1;
  color: rgba(51,51,51,0.64);
  font-size: 1.75rem;
  text-align: center;
  padding: 0.5rem;
  cursor: pointer;

  ${'' /* transition: background 0.25s ease-in-out; */}
  ${'' /* transition: box-shadow 0.25s ease-in-out; */}
  border-radius: 0.5rem;
  
  :hover {
    color: rgba(51, 51, 51, 0.64);
  }

  ${(props) => props.active && css`
    color: ${Colors.SNOW_WHITE};
    background: rgba(51,51,51,0.64);
    box-shadow: -2px -2px 8px rgba(231,231,231,0.2), 2px 2px 8px rgba(0,0,0,0.3);
    transition: all 0.2s ease-in-out;
    :hover {
      color: ${Colors.SNOW_WHITE};
      background-color: rgba(51, 51, 51, 0.54);
    }
  `}
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

export const Header = (props) => {
  const router = useRouter()
  const { pathname }  = router

  return (
    <Wrapper>
      <HeaderWrapper>
        {/* <Logo src='https://www.jdhayford.io/images/jh-logo-2.png' /> */}
        <Option active={pathname === '/'} exact href='/'>
          Home
        </Option>
        <Option active={pathname === '/projects'} href='/projects'>
            Projects
        </Option>
        <Option active={pathname.startsWith('/blog')} href='/blog'>
            Blog
        </Option>
      </HeaderWrapper>
    </Wrapper>
  )
}

export const withHeader = (ChildComponent) => (
  <>
    <Header />
    <ChildComponent />
  </>
)

export default Header

