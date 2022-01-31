import { Button } from '@mui/material';
import React from 'react';
import GoogleButton from 'react-google-button';

import {
    FormButtonContainer,
    FormContainer,
    FormInput,
    FormItemContainer,
} from '../../components/Form';
import { SmallFont } from '../../components/Typography';
import { FormButtonStyle } from '../../constants/stylesConstants';
import { useUserContext } from '../../context/UserContext';
import { GoogleButtonContainer } from './LoginPage';

interface SignInFormProps {
    changeScreenBetweenSignInSignUpForm: () => void;
}
const SignInForm: React.FC<SignInFormProps> = ({
    changeScreenBetweenSignInSignUpForm,
}) => {
    const emailInputRef = React.useRef<HTMLInputElement>(null);
    const passwordInputRef = React.useRef<HTMLInputElement>(null);
    const { isUserLoading, signInWithGoogle, signInWithPasswordAndEmail } =
        useUserContext();
    const handleSignInForm = () => {
        if (!emailInputRef.current || !passwordInputRef.current) return;
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        if (!email || !password) return;
        signInWithPasswordAndEmail({ email, password });
    };
    return (
        <>
            <FormContainer
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                style={{ flexBasis: '70%' }}
                id="sign-in-form"
            >
                <FormItemContainer id="email-container">
                    <SmallFont>*Email:</SmallFont>
                    <FormInput
                        required
                        autoFocus
                        type="email"
                        ref={emailInputRef}
                    />
                </FormItemContainer>
                <FormItemContainer id="password-container">
                    <SmallFont>*Password:</SmallFont>
                    <FormInput
                        ref={passwordInputRef}
                        required
                        type="password"
                    />
                </FormItemContainer>
                <Button
                    onClick={handleSignInForm}
                    style={FormButtonStyle}
                    variant="contained"
                    type="submit"
                >
                    Log in
                </Button>
            </FormContainer>
            <FormButtonContainer
                style={{ flexBasis: '30%' }}
                id="button-container"
            >
                <SmallFont
                    onClick={changeScreenBetweenSignInSignUpForm}
                    style={{ cursor: 'pointer', marginLeft: '5px' }}
                    // style={FormButtonStyle}
                    bolder
                    // variant="contained"
                >
                    You don&apos;t have account yet ?
                </SmallFont>
                <GoogleButtonContainer>
                    <GoogleButton
                        type="light"
                        style={{ color: '#000' }}
                        disabled={isUserLoading}
                        onClick={signInWithGoogle}
                    >
                        Sign In Google
                    </GoogleButton>
                </GoogleButtonContainer>
            </FormButtonContainer>
        </>
    );
};
export default SignInForm;
