
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Helmet } from 'react-helmet'
import styled, { css, keyframes } from 'styled-components'
import { connect } from 'react-redux'
import NavLink from '../js/utils/Link'
import content from './streaming-blog.md'


import * as Colors from '../utils/Colors'
import { withHeader } from '../../js/Components/Header'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: stretch;

    width: 100vw;
    min-height: calc(100vh - 7rem);
    background-color: ${Colors.BLUE_STEEL};
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
  line-height: 1.5rem;

  animation: ${fadeIn} 0.5s ease;

  @media only screen and (max-width: 700px) {
    padding: 1rem 1rem;
    font-size: 1rem;
    line-height: 1.3rem;
  }
  
  h1 {
    color: ${Colors.MINT_GREEN};

    @media only screen and (max-width: 800px) {
      font-size: 1.4rem;
      line-height: 1.75rem;
    }
  }

  blockquote {
    font-weight: lighter;
    padding-left: 0.5rem;
    border-left: 1px solid #b7c7c9;
    color: #c5cfd8;
    margin: 0.5rem;

    p {
      margin: 0.5rem 0;
      word-break: break-word;
    }

    p:not(:first-child) {
      padding-top: 1rem;
    }
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
    font-size: 1.2rem;
    word-break: break-word;
    color: #f9c49e;
    background-color: rgb(41 43 45);
    border: 1px solid #505050;
    padding: 0 0.2rem;
    border-radius: 0.15rem;

    @media only screen and (max-width: 800px) {
      font-size: 1.2rem;
    }
  }

  img {
    width: 100%;
    border-radius: 0.5rem;
    margin: 1rem 0;

    &.small {
      width: 75%;
    }

    &.tiny {
      max-width: 50%;
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

export default withHeader(Blog)
