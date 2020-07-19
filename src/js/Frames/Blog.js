import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import ReactGA from 'react-ga'
import styled from 'styled-components'

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


const Blog = (props) => {
    return (
        <>
            <MainSection>
             Coming soon
            </MainSection>
        </>
    )
}

export default Blog