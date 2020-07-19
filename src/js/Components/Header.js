import React from 'react'
import { withRouter } from 'react-router'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'

import { RIFF_VIOLET, DARK_SLATE, PRIMARY_ACCENT, TENNIS_YELLOW } from '../utils/Colors'

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

const HeaderLogo = styled.img`
  width: 1.75rem;
  cursor: pointer;
  margin: 0.25rem 0.5rem;
`
const Option = styled.div`
  flex: 1;
  ${'' /* color: ${props => props.selected ? '#3a3b3c' : '#aadfef'}; */}
  color: #3a3b3c;
  font-size: 1.75rem;
  text-align: center;
  padding: 0.5rem;
  cursor: pointer;

  transition: background 0.15s ease-in-out;
  border-radius: 0.5rem;
  
  :hover {
    color: rgba(51, 51, 51, 0.46);
  }

  ${props => props.selected && css`
    color: #e2ebf1;
    background: rgba(51,51,51,0.46);
    box-shadow: -2px -2px 8px rgba(231,231,231,0.2), 2px 2px 8px rgba(0,0,0,0.3);

    :hover {
      color: #e2ebf1;
      background-color: rgba(51, 51, 51, 0.26);
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
  )
}

export default withRouter(Header)

