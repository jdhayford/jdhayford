import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import shortid from 'shortid'
import ReactGA from 'react-ga'
import styled from 'styled-components'
import * as Colors from '../utils/Colors'
import Link from '../utils/Link'
import { Helmet } from 'react-helmet'

const Wrapper = styled.div`
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: stretch;

    max-width: 60rem;
    padding-bottom: 6rem;

    @media only screen and (max-width: 900px) {
        max-width: 95%;
    }
`
const BlogItem = styled(Link)`
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    padding: 1rem;
    font-size: 1.5rem;
    color: ${Colors.SNOW_WHITE};
    background: rgba(51,51,51,0.64);
    border-radius: 0.5rem;
    box-shadow: -2px -2px 8px rgba(231,231,231,0.2), 2px 2px 8px rgba(0,0,0,0.3);

    &:first-child {
        margin-top: 1rem;
    }
  
    @media only screen and (max-width: 800px) {
    }
`


const Header = styled.div`
    font-size: 1.5rem;

    a {
        text-decoration-color: rgba(255, 255, 255, 0.25);
        color: ${Colors.SNOW_WHITE};

        :hover {
            opacity: 0.8;
        }
    }

    @media only screen and (max-width: 600px) {
        font-size: 1.1rem;
    }
`

const Thumbnail = styled.div`
  border-radius: 0.5rem;
  align-self: center;
`

const Looper = styled.video.attrs(() => ({
  autoPlay: true,
  loop: true,
  muted: true,
  controls: true
}))`
  width: 100%;
  border-radius: 0.5rem;
`

const Image = styled.img`
  width: 10rem;
  border-radius: 0.5rem;

    @media only screen and (max-width: 500px) {
        width: 8rem;
    }
`

const Subtext = styled.div`
    color: #c5cfd8;
    font-size: 0.8rem;
    padding-top: 0.25rem;
`

const Description = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  padding-left: 2rem;

  @media only screen and (max-width: 800px) {
    margin-top: 0.5rem;
    padding: 0 1rem;
  }
`

const Blog = (props) => {
    return (
        <Wrapper>
            <Helmet>
                <title>Jack Hayford - Blog</title>
            </Helmet>
            <BlogItem to='/blog/popping-the-hood-on-video-streaming'>
                <Thumbnail>
                    <Image src='https://www.jdhayford.io/images/stream-thumb.png' />
                </Thumbnail>
                <Description>
                    <Header>
                        Popping the Hood on Video Streaming
                    </Header>
                    <Subtext>
                        8/5/20
                    </Subtext>
                </Description>
            </BlogItem>
        </Wrapper>
    )
}

export default Blog