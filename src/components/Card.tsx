import React from 'react';
import styled from 'styled-components';

import { darkColor } from '../constants/stylesConstants';

interface CardProps {
    style?: React.CSSProperties;
}

export const CardContainer = styled.div`
    background-color: ${darkColor};
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
        rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

export const CardInsideContainer = styled.div`
    display: flex;
    background-color: #252d3b;
    border-radius: 10px;
    padding: 10px;
    justify-content: space-between;
    flex-direction: column;
    flex-basis: 100%;
`;

export const Card: React.FC<CardProps> = ({ children, ...props }) => {
    return <CardContainer {...props}>{children}</CardContainer>;
};
