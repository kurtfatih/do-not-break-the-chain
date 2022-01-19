import { Grid } from '@mui/material';
import React from 'react';

// import styled from 'styled-components';
import { Card } from '../../components/Card';
import { Loading } from '../../components/Loading';
import { useDbContext } from '../../context/DbContext';
import { useUserContext } from '../../context/UserContext';
import { ContactForm } from './ContactForm';

// const ContactPageContainer = styled.div`
//     display: flex;
//     flex: 1;
//     justify-content: center;
//     align-items: center;
// `;
export const ContactPage: React.FC = () => {
    console.log('contact page');
    const { isUserLoggedIn, user, isUserLoading } = useUserContext();
    const { createNewContactOnDb } = useDbContext();
    const emailInputRef = React.useRef<HTMLInputElement>(null);
    const messageInputRef = React.useRef<HTMLTextAreaElement>(null);
    const nameInputRef = React.useRef<HTMLInputElement>(null);
    const handleSend = React.useCallback(() => {
        if (!emailInputRef.current || !messageInputRef.current) return;
        const email = emailInputRef.current.value;
        const message = messageInputRef.current.value;
        const name = isUserLoggedIn()
            ? user?.displayName
            : nameInputRef.current?.value;

        if (!email || !message) return;

        createNewContactOnDb({ email, message, name });

        emailInputRef.current.value = '';
        messageInputRef.current.value = '';
        if (!nameInputRef.current) return;
        nameInputRef.current.value = '';
    }, [createNewContactOnDb, isUserLoggedIn, user?.displayName]);
    if (isUserLoading) return <Loading />;
    return (
        <Grid justifyContent="center" container alignItems="center">
            <Card
                style={{
                    display: 'flex',
                    flexBasis: '30%',
                    height: '60%',
                    maxHeight: '400px',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#252d3b',
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <ContactForm
                        isUserLoggedIn={isUserLoggedIn()}
                        handleSend={handleSend}
                        emailInputRef={emailInputRef}
                        messageInputRef={messageInputRef}
                        nameInputRef={nameInputRef}
                    />
                </div>
            </Card>
        </Grid>
    );
};
