import React from 'react';
import styled from 'styled-components';

const ContentBodyContainer = styled.div`
    background-color: red;
    justify-content: center;
`;

export const Content: React.FC = ({ children }) => {
    return <ContentBodyContainer>{children}</ContentBodyContainer>;
};
