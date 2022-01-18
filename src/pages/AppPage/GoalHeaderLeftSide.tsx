import React from 'react';
import styled from 'styled-components';

import { Card, CardInsideContainer } from '../../components/Card';
import { breakPoints } from '../../constants/stylesConstants';
import GoalNameForm from './GoalNameForm';
import { GoalYearForm } from './GoalYearForm';

const GoalHeaderLeftSide: React.FC = () => {
    return (
        <HeaderLeftSideContainer id="leftside container">
            <HeaderLeftSideCardContainer>
                <CardInsideContainer>
                    <GoalNameForm />
                    <GoalYearForm />
                </CardInsideContainer>
            </HeaderLeftSideCardContainer>
        </HeaderLeftSideContainer>
    );
};

export default React.memo(GoalHeaderLeftSide);

const HeaderLeftSideContainer = styled.div`
    display: flex;
    flex-basis: 40%;

    @media (max-width: ${breakPoints.md}) {
        display: block;
        width: 100%;
        flex-basis: 100%;
    }
`;

const HeaderLeftSideCardContainer = styled(Card)`
    display: flex;
    justify-content: center;
    flex-basis: 100%;
    min-height: 148px;

    @media (max-width: ${breakPoints.md}) {
        display: block;
        border-radius: 0;
    }
`;
