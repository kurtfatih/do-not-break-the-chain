import AddRounded from '@mui/icons-material/AddRounded';
import { Button, IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import { Card } from '../../components/Card';
import { SmallFont } from '../../components/Typography';
import { goalDataType } from '../../constants/dbconstant';
import { breakPoints, greenColor } from '../../constants/stylesConstant';
import { useNavigateTo } from '../../hooks/useNavigateTo';
import { truncateString } from '../../utils/stringUtils';

interface GoalsPageContentProps {
    allGoals: goalDataType[];
    addNewGoal: () => void;
    deleteGoal: (goalId: string) => void;
}

const GoalsPageContent: React.FC<GoalsPageContentProps> = ({
    addNewGoal,
    allGoals,
    deleteGoal,
}) => {
    const {goTo} = useNavigateTo();
    const handleClick = (goal: goalDataType) => {
        const link = `/goal/${goal.goalId}/${
            goal.years[goal.years.length - 1]
        }${
            goal.selectedDaysInTheMonth.length > 0
                ? '/' + goal.selectedDaysInTheMonth[0].month
                : ''
        }`;
        goTo(link);
    };
    return (
        <GoalsPageContainer>
            <GoalsContentsContainer id="goals-contents ">
                {allGoals.map((goal, index) => (
                    <GoalItemContainer id="goal-item-container" key={index}>
                        <GoalItemMain
                            id="goal-item-main"
                            onClick={() => handleClick(goal)}
                        >
                            <Card
                                style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    background: '#191E28',
                                }}
                                key={goal.goalId}
                            >
                                <SmallFont>Year : {goal.years[0]}</SmallFont>
                                <SmallFont style={{ marginTop: '5px' }}>
                                    Goal :
                                    {goal?.goalTexts &&
                                    goal.goalTexts.length > 0
                                        ? truncateString(
                                              goal.goalTexts[0].text,
                                              8,
                                          )
                                        : ''}
                                </SmallFont>
                                <SmallFont>
                                    Selected Days:
                                    {goal.totalSelectedDaysNumber}
                                </SmallFont>
                                <SmallFont>
                                    Missed Days:{' '}
                                    {/* {getTheMissedDay(
                                        goal.createdAt.toDate(),
                                        goal.totalSelectedDaysNumber,
                                    )} */}
                                </SmallFont>
                                {/* missed day calculatin
                                  current date -   document created date  - total selected days

                                */}
                            </Card>
                        </GoalItemMain>
                        <Button
                            variant="contained"
                            color="warning"
                            onClick={() => deleteGoal(goal.goalId)}
                        >
                            Delete Goal
                        </Button>
                    </GoalItemContainer>
                ))}
            </GoalsContentsContainer>
            <AddButtonContainer id="add-button-container">
                <IconButton
                    // variant="contained"
                    style={{
                        display: 'flex',
                        backgroundColor: '#00000050',
                        color: greenColor,
                    }}
                    color="success"
                    size="large"
                    onClick={addNewGoal}
                >
                    <AddRounded fontSize="large" />
                </IconButton>
            </AddButtonContainer>
        </GoalsPageContainer>
    );
};
export default React.memo(GoalsPageContent);

const GoalsPageContainer = styled(Card)`
    display: flex;
    flex: 1;
    flex-flow: column wrap;
    gap: 20px;
    background: linear-gradient(
        156deg,
        rgba(41, 50, 65, 1) 0%,
        rgba(28, 34, 45, 1) 70%
    );
`;
const GoalsContentsContainer = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: 10px;
`;
const GoalItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: transform linear 0.1s;
    transform: scale(1);
    min-height: 220px;
    max-height: 220px;
    min-width: 150px;
    max-width: 150px;
    overflow-y: auto;
    &:hover {
        transform: scale(1.1);
    }
`;

const GoalItemMain = styled.div`
    display: flex;
    flex-basis: 100%;
`;
const AddButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    @media (max-width: ${breakPoints.lg}) {
        position: fixed;
        right: 5%;
        top: 5%;
    }
`;
