import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';


const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default (props) => <StyledLink {...props} />;