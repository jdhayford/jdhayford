import React, { useState, useEffect, Component } from 'react'
import shortid from 'shortid'
import ReactGA from 'react-ga'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'

import { RIFF_VIOLET, DARK_SLATE } from '../js/utils/Colors'
import Me from '../images/me.png'
import * as Colors from '../js/utils/Colors'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: stretch;
    ${'' /* padding-bottom: 12rem; */}

    max-width: 44rem;

    @media only screen and (max-width: 700px) {
        max-width: 95%
    }
`

const AvatarCircle = styled.div`
`

const Avatar = styled.img`
  border-radius: 4rem;
  height: 8rem;
  width: 8rem;
  object-fit: cover;
  box-shadow: -2px -2px 8px rgba(231,231,231,0.2), 2px 2px 8px rgba(0,0,0,0.3);
`

const AvatarSubtitle = styled.div`
  margin-left: 2rem;

  @media only screen and (max-width: 600px) {
    margin-left: 0;
    padding: 0 1rem;
    margin-top: 2rem;
  }
`

const MeSpan = styled.span`
    color: ${Colors.MINT_GREEN};
    font-weight: 800;
`

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    padding: 2rem;
    font-size: 1.5rem;
    color: ${Colors.SNOW_WHITE};
    background: rgba(51,51,51,0.64);
    border-radius: 0.5rem;
    box-shadow: -2px -2px 8px rgba(231,231,231,0.2), 2px 2px 8px rgba(0,0,0,0.3);
  
    @media only screen and (max-width: 600px) {
      padding: 1.5rem 0.5rem;
    }
`

const Intro = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: 600px) {
      flex-direction: column;
  }
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  align-self: flex-end;

  @media only screen and (max-width: 600px) {
    margin-top: 2rem;
    align-self: center;
  }
`

const SocialIcon = styled.div`
  font-size: 2rem;
  padding: 0 1.25rem;

  cursor: pointer;
  transition: color 0.15s ease-in-out;

  a {
    color: ${Colors.SNOW_WHITE};

    :hover {
      color: ${Colors.MINT_GREEN};
    }
  }
`

const Github = () => (
  <SocialIcon>
    <a href='https://github.com/jdhayford'>
      <i alt='github' className="fab fa-github"></i>
    </a>
  </SocialIcon>
)

const Linkedin = () => (
  <SocialIcon>
    <a href='https://linkedin.com/in/jack-hayford/'>
      <i alt='linkedin' className="fab fa-linkedin"></i>
    </a>
  </SocialIcon>
)

const Twitter = () => (
  <SocialIcon>
    <a href='https://twitter.com/hayford_jack'>
      <i alt='twitter' className="fab fa-twitter"></i>
    </a>
  </SocialIcon>
)

function Home (props) {
    return (
        <Wrapper>
            <Helmet>
              <title>Jack Hayford</title>
            </Helmet>
            <MainSection>
              <Intro>
                <AvatarCircle>
                  <Avatar src={Me} alt={'picture of me'} />
                </AvatarCircle>
                <AvatarSubtitle>
                    Hey there, I'm <MeSpan>Jack</MeSpan>.
                    <br />
                    <br />
                    I like to create things, especially the things that I couldn't.
                </AvatarSubtitle>
              </Intro>
              <Links>
                <Github />
                <Linkedin />
                <Twitter />
              </Links>
            </MainSection>
        </Wrapper>
    )
  }

export default Home