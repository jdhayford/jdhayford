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

const Avatar = styled.img`
  border-radius: 4rem;
  height: 8rem;
  width: 8rem;
  object-fit: cover;
  box-shadow: -2px -2px 8px rgba(231,231,231,0.2), 2px 2px 8px rgba(0,0,0,0.3);
`

const AvatarSubtitle = styled.div`
  margin-left: 2rem;

  @media only screen and (max-width: 700px) {
    margin-top: 2rem;;
  }
`

const MeSpan = styled.span`
    color: #5EFCE8;
    font-weight: 800;
`

const MainSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 2rem;
    padding: 2rem;
    font-size: 1.5rem;
    color: #f3faff;
    background: rgba(51,51,51,0.64);
    border-radius: 0.5rem;
    box-shadow: -2px -2px 8px rgba(231,231,231,0.2), 2px 2px 8px rgba(0,0,0,0.3);

    @media only screen and (max-width: 700px) {
        flex-direction: column;
    }
`

const Home = (props) => {
    return (
        <>
            <MainSection>
                <Avatar src={Me} />
                <AvatarSubtitle>
                    Hey there, I'm <MeSpan>Jack</MeSpan>.
                    <br />
                    <br />
                    I like to code and believe in enabling people to be creative.
                </AvatarSubtitle>
            </MainSection>
        </>
    )
}

export default Home