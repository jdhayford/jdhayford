import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import ReactGA from 'react-ga'
import styled from 'styled-components'

import { RIFF_VIOLET, DARK_SLATE } from '../utils/Colors'
import Me from '../../images/me.png'
import Header, { withHeader } from '../Components/Header'


const Row = styled.div`
  display: flex;
  min-width: calc(100vw - 20rem);

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
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
  
    @media only screen and (max-width: 700px) {
      padding: 1.5rem 0.5rem;
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

const Project = (props) => {
    return (
        <>
            <MainSection>
              Coming soon
            </MainSection>
        </>
    )
}

export default Project