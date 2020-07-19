import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { Route, Switch, Redirect } from 'react-router'
import Home from './Home'
import Header from '../Components/Header'


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

const Main = (props) => {
    return (
        <Wrapper>
            <Header />
            <Switch>
                <Route exact path='/' component={Home} />
            </Switch>
        </Wrapper>
    )
}

export default withRouter(Main)