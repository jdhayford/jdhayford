
import React from 'react'
import { withRouter } from 'react-router'
// import { NavLink } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Helmet } from 'react-helmet'
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
    min-height: calc(100vh - 7rem);
    background-color: ${Colors.STEEL_BLACK};
    box-shadow: inset 0 2px 8px rgba(0,0,0,0.3);
    max-width: 100vw;
    margin-top: 1rem;
`


const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 0 auto;
  padding: 1rem 3rem;
  max-width: 46rem;

  @media only screen and (max-width: 800px) {
    padding: 1rem 1rem;
  }
  
  h1 {
    color: ${Colors.MINT_GREEN};

    @media only screen and (max-width: 800px) {
      font-size: 1.4rem;
    }
  }

  p {
    @media only screen and (max-width: 800px) {
      font-size: 0.9rem;
    }
  }

  ul {
    @media only screen and (max-width: 800px) {
      font-size: 0.9rem;
    }
  }

  blockquote {
    font-weight: lighter;
    padding-left: 0.5rem;
    border-left: 1px solid #b7c7c9;
    color: #c5cfd8;
    margin: 1rem;
  }

  a {
    text-decoration-color: rgba(255, 255, 255, 0.25);
    color: ${Colors.MINT_GREEN};
  }

  video {
    width: 100%;
    border-radius: 0.5rem;
    margin: 1rem 0;

    &.tiny {
      width: 40%
    }
  }

  code {
    @media only screen and (max-width: 800px) {
      word-break: break-word;
    }
  }

  img {
    width: 100%;
    border-radius: 0.5rem;
    margin: 1rem 0;

    &.small {
      width: 75%;
    }
  }
`

const Blog = (props) => {
  return (
      <Wrapper>
        <Helmet>
          <title>Jack Hayford - Blog</title>
        </Helmet>
        <ContentWrapper>
          <ReactMarkdown source={content} escapeHtml={false} />
        </ContentWrapper>
      </Wrapper>
  )
}

export default Blog
