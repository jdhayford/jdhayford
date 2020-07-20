import React from 'react'
import { withRouter } from 'react-router'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'

import * as Colors from '../utils/Colors'

const Wrapper = styled.div`
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: stretch;

    max-width: 44rem;

    @media only screen and (max-width: 700px) {
        max-width: 95%
    }
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 2rem;
  width: 100%;

  @media only screen and (max-width: 700px) {
    margin-top: 1rem;
  }
`

const Option = styled.div`
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

  ${props => props.selected && css`
    color: ${Colors.SNOW_WHITE};
    background: rgba(51,51,51,0.64);
    box-shadow: -2px -2px 8px rgba(231,231,231,0.2), 2px 2px 8px rgba(0,0,0,0.3);
    transition: all 0.2s ease-in-out;
    :hover {
      color: ${Colors.SNOW_WHITE};
      background-color: rgba(51, 51, 51, 0.54);
    }
  `};

`

const Row = styled.div`
  display: flex;
  align-items: center;
`

export const Header = (props) => {
  const { pathname }  = props.location
  const goTo = path => () => props.history.push(path)
  return (
    <Wrapper>
      <HeaderWrapper>
        <Option selected={pathname === '/'} onClick={goTo('/')}>
          Home
        </Option>
        <Option selected={pathname === '/projects'} onClick={goTo('/projects')}>
          Projects
        </Option>
        <Option selected={pathname === '/blog'} onClick={goTo('/blog')}>
          Blog
        </Option>
      </HeaderWrapper>
    </Wrapper>
  )
}

export default withRouter(Header)

