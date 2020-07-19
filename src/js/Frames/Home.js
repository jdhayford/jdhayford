import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import ReactGA from 'react-ga'
import styled from 'styled-components'

import { RIFF_VIOLET, DARK_SLATE } from '../utils/Colors'
import Me from '../../images/me.png'
import Header, { withHeader } from '../Components/Header'


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
    color: #5EFCE8;
    font-weight: 800;
`

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    padding: 2rem;
    font-size: 1.5rem;
    color: #f3faff;
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
    color: #f3faff;

    :hover {
      color: #5EFCE8;
    }
  }
`

const Github = () => (
  <SocialIcon>
    <a href='https://github.com/jdhayford'>
      <i class="fab fa-github"></i>
    </a>
  </SocialIcon>
)

const Linkedin = () => (
  <SocialIcon>
    <a href='https://linkedin.com/in/jack-hayford/'>
      <i class="fab fa-linkedin"></i>
    </a>
  </SocialIcon>
)

const Twitter = () => (
  <SocialIcon>
    <a href='https://twitter.com/hayford_jack'>
      <i class="fab fa-twitter"></i>
    </a>
  </SocialIcon>
)

const Home = (props) => {
    return (
        <>
            <MainSection>
              <Intro>
                <AvatarCircle>
                  <Avatar src={Me} />
                </AvatarCircle>
                <AvatarSubtitle>
                    Hey there, I'm <MeSpan>Jack</MeSpan>.
                    <br />
                    <br />
                    I like to code and love tools that multiply creativity.
                </AvatarSubtitle>
              </Intro>
              <Links>
                <Github />
                <Linkedin />
                <Twitter />
              </Links>
            </MainSection>
        </>
    )
}

export default Home