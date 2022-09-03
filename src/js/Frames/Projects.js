import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import ReactGA from 'react-ga'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import * as Colors from '../utils/Colors'

const Wrapper = styled.div`
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: stretch;

    max-width: 60rem;
    padding-bottom: 6rem;

    @media only screen and (max-width: 900px) {
        max-width: 95%
    }

    a {
      color: ${Colors.MINT_GREEN};
    }
`

const Row = styled.div`
  display: flex;
  min-width: calc(100vw - 20rem);

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const ProjectSection = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    padding: 2rem;
    font-size: 1.5rem;
    color: ${Colors.SNOW_WHITE};
    background: rgba(51,51,51,0.64);
    border-radius: 0.5rem;
    box-shadow: -2px -2px 8px rgba(231,231,231,0.2), 2px 2px 8px rgba(0,0,0,0.3);

    &:first-child {
      margin-top: 1rem;
    }
  
    @media only screen and (max-width: 800px) {
      padding: 1.5rem 0.5rem;
      flex-direction: column;
      align-items: center;
    }
`

const Header = styled.div`
  a {
    ${'' /* text-decoration: none; */}
    text-decoration-color: rgba(255, 255, 255, 0.25);
    color: ${Colors.SNOW_WHITE};

    :hover {
      opacity: 0.8;
    }
  }
`

const Demo = styled.div`
  width: 30rem;
  border-radius: 0.5rem;
  align-self: center;

  @media only screen and (max-width: 800px) {
    width: 95%;
  }
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
  width: 100%;
  border-radius: 0.5rem;
`

const Description = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  padding-left: 2rem;

  @media only screen and (max-width: 800px) {
    margin-top: 1rem;
    padding: 0 1rem;
  }
`
const Info = styled.div`
  font-size: 1.1rem;
  margin-top: 1rem;
  padding: 1rem;
  box-shadow: inset -2px -2px 8px rgba(231,231,231,0.15), inset 2px 2px 8px rgba(0,0,0,0.15);
  border-radius: 0.5rem;

  div {
    font-weight: lighter;
    opacity: 0.7;
    padding-left: 0.5rem;
    border-left: 1px solid #c5cfd8;
  }
`

const Tools = styled.div`
  flex: 1;
  font-size: 1.75rem;
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
  padding-top: 1.5rem;

  i {
    margin-left: 1rem;
  }
`


const Project = (props) => {
    return (
        <Wrapper>
            <Helmet>
              <title>Jack Hayford - Projects</title>
            </Helmet>
            <ProjectSection>
              <Demo>
                <Looper src='https://www.jdhayford.io/videos/acid-demo.mp4'>
                  Your browser does not support HTML5 Player.
                </Looper>
              </Demo>
              <Description>
                <Header>
                  <a id='acid-tabs' href='https://chrome.google.com/webstore/detail/acid-tabs/hgceopemmcmigbmhphbcgkeffommpjfc'>
                    Acid Tabs
                  </a>
                </Header>
                <Info>
                  Acid Tabs makes organizing tabs ridiculously easy by automatically grouping tabs together based on customizable rules.
                  <br />
                  <br />
                  <div>
                    I love Chrome's new Tab Groups feature but never enjoyed the tedious manual work of organizing tabs. I built Acid Tabs so I could be lazy again.
                    <br />
                    <br />
                    The extension is open-sourced <a href="https://github.com/jdhayford/acid-tabs-extension">here</a>.
                  </div>
                </Info>
                <Tools>
                  <i className="devicon-react-original" alt='react'></i>
                </Tools>
              </Description>
            </ProjectSection>

            <ProjectSection>
              <Demo>
                <Looper src='https://www.jdhayford.io/videos/strumpad-demo.mp4'>
                  Your browser does not support HTML5 Player.
                </Looper>
              </Demo>
              <Description>
                <Header>
                    Strumpad
                </Header>
                <Info>
                  Strumpad brings the theory, allowing guitarists to easily find chords and build chord progressions without having to know theory.
                  <br />
                  <br />
                  <div>
                    I built Strumpad in an attempt to close the feedback loop between exploring and playing.
                  </div>
                </Info>
                <Tools>
                  <i className="devicon-react-original" alt='react'></i>
                </Tools>
              </Description>
            </ProjectSection>

            <ProjectSection>
              <Demo>
                <Image src='https://www.jdhayford.io/images/deja-demo.png' />
              </Demo>
              <Description>
                <Header>
                  <a id='deja' href='https://github.com/jdhayford/deja'>
                    Deja
                  </a>
                </Header>
                <Info>
                  Deja is a chrome extension that lets you create "replays" from live streams (specifically HLS streams).
                  <br />
                  <br />
                  <div>
                    I mainly used this to learn HLS streaming and Go.
                    One cool part about this approach was that you could grab a replay from your phone while watching the stream on the computer.
                  </div>
                </Info>
                <Tools>
                  <i className='devicon-go-plain' alt='golang'></i>
                  <i className='devicon-react-original' alt='react'></i>
                </Tools>
              </Description>
            </ProjectSection>

            <ProjectSection>
              <Demo>
                <Looper src='https://www.jdhayford.io/videos/arkade-demo.mp4' />
              </Demo>
              <Description>
                <Header>
                  <a id='arkade' href='https://github.com/jdhayford/arkade'>
                    Arkade
                  </a>
                </Header>
                <Info>
                  Arkade was a one-day POC for doing websocket-driven games using a main shared display.
                  <br />
                  <br />
                  <div>
                    You and another player could scan the main screen QR to join, then faceoff in a round of Rock, Paper, Scissors.
                  </div>
                </Info>
                <Tools>
                  <i className='devicon-react-plain' alt='javascript'></i>
                </Tools>
              </Description>
            </ProjectSection>

            <ProjectSection>
              <Demo>
                <Looper src='https://www.jdhayford.io/images/frak-demo.mp4' />
              </Demo>
              <Description>
                <Header>
                  <a id='frak' href='https://github.com/jdhayford/frak'>
                    Frak
                  </a>
                </Header>
                <Info>
                  Frak is a small POC extension I built while testing out the MediaStream Recording API.
                  <br />
                  <br />
                  <div>
                    You click a video element you want to record, then after you pause the video it prompts you to download the created video.
                  </div>
                </Info>
                <Tools>
                  <i className='devicon-javascript-plain' alt='javascript'></i>
                </Tools>
              </Description>
            </ProjectSection>
        </Wrapper>
    )
}

export default Project