import { Grid } from '@mui/material';
import React from 'react';
import { Navigate } from 'react-router';
import styled from 'styled-components';

import { Card } from '../../components/Card';
import { Loading } from '../../components/Loading';
import { useUserContext } from '../../context/UserContext';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export const LoginPage: React.FC = () => {
    const { isUserLoading, isUserLoggedIn } = useUserContext();
    const [isSignIn, setIsSignIn] = React.useState(true);
    const changeScreenBetweenSignInSignUpForm = () => {
        setIsSignIn(!isSignIn);
    };
    if (isUserLoading) return <Loading />;
    if (isUserLoggedIn()) return <Navigate to="/goals" />;
    return (
        <Grid justifyContent="center" container alignItems="center">
            <Card
                style={{
                    display: 'flex',
                    height: '50%',
                    flexBasis: '36%',
                    maxHeight: '400px',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#252d3b',
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        flexDirection: 'column',
                        padding: '10px',
                    }}
                >
                    {isSignIn ? (
                        <SignInForm
                            changeScreenBetweenSignInSignUpForm={
                                changeScreenBetweenSignInSignUpForm
                            }
                        />
                    ) : (
                        <SignUpForm
                            changeScreenBetweenSignInSignUpForm={
                                changeScreenBetweenSignInSignUpForm
                            }
                        />
                    )}
                </div>
            </Card>
        </Grid>
    );
};

export const LoginPageContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
`;
export const GoogleButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;
