import { Button } from '@mui/material';
import React from 'react';

import {
    FormButtonContainer,
    FormContainer,
    FormInput,
    FormItemContainer,
} from '../../components/Form';
import { SmallFont } from '../../components/Typography';
import { FormButtonStyle } from '../../constants/stylesConstant';
import { useUserContext } from '../../context/UserContext';

interface SignUpFormProps {
    changeScreenBetweenSignInSignUpForm: () => void;
}
const SignUpForm: React.FC<SignUpFormProps> = ({
    changeScreenBetweenSignInSignUpForm,
}) => {
    const { createUserWithEmailPasswordAndDisplayName } = useUserContext();

    const emailInputRef = React.useRef<HTMLInputElement>(null);
    const passwordInputRef = React.useRef<HTMLInputElement>(null);
    const displayNameInputRef = React.useRef<HTMLInputElement>(null);
    const handleSignUpClick = () => {
        if (
            !emailInputRef.current ||
            !passwordInputRef.current ||
            !displayNameInputRef.current
        )
            return;
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const displayName = displayNameInputRef.current.value;
        if (!email || !password) return;
        console.log('handle', email, password, displayName);
        createUserWithEmailPasswordAndDisplayName(email, password, displayName);
    };
    return (
        <>
            <FormContainer
                onSubmit={(e) => e.preventDefault()}
                style={{ flex: 3 }}
                id="sign-in-form"
            >
                <FormItemContainer id="email-container">
                    <SmallFont>Email:</SmallFont>
                    <FormInput required ref={emailInputRef} type="email" />
                </FormItemContainer>
                <FormItemContainer id="password-container">
                    <SmallFont>Password:</SmallFont>
                    <FormInput
                        required
                        type="password"
                        ref={passwordInputRef}
                    />
                </FormItemContainer>
                <FormItemContainer id="display-name-container">
                    <SmallFont>Name:</SmallFont>
                    <FormInput required ref={displayNameInputRef} type="text" />
                </FormItemContainer>
                <Button
                    onClick={handleSignUpClick}
                    style={FormButtonStyle}
                    variant="contained"
                    type="submit"
                >
                    SignUp
                </Button>
            </FormContainer>
            <FormButtonContainer id="button-container">
                <SmallFont
                    onClick={changeScreenBetweenSignInSignUpForm}
                    isPointer
                    ml={5}
                    bolder
                >
                    You have account already ?
                </SmallFont>
            </FormButtonContainer>
        </>
    );
};
export default SignUpForm;
