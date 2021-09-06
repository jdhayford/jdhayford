import React, { Component } from 'react';
import Link from 'next/link'

import styled from 'styled-components';


const StyledLink = styled.a`
    text-decoration: none;
    color: inherit;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default (props) => <StyledLink {...props} />;