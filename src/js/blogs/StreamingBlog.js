
import React from 'react'
import { withRouter } from 'react-router'
// import { NavLink } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import NavLink from '../utils/Link'
import content from './streaming-blog.md'


import * as Colors from '../utils/Colors'

const Wrapper = styled.div`
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: stretch;

    width: 100vw;
    height: calc(100vh - 7rem);
    background-color: ${Colors.STEEL_BLACK};
    box-shadow: inset 0 2px 8px rgba(0,0,0,0.3);

`


const ContentWrapper = styled.div`
  padding: 3rem;
`

const Blog = (props) => {
  return (
      <Wrapper>
          <ContentWrapper>
            <ReactMarkdown source={content} />
          </ContentWrapper>
      </Wrapper>
  )
}

export default Blog
