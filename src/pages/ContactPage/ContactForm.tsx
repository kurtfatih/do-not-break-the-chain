import Button from '@mui/material/Button';
import React from 'react';

import {
    FormButtonContainer,
    FormContainer,
    FormInput,
    FormItemContainer,
    FormTextAreaInput,
} from '../../components/Form';
import { SmallFont } from '../../components/Typography';
import { FormButtonStyle } from '../../constants/stylesConstants';

interface ContactFormProps {
    isUserLoggedIn: boolean;
    handleSend: () => void;
    emailInputRef: React.RefObject<HTMLInputElement>;
    messageInputRef: React.RefObject<HTMLTextAreaElement>;
    nameInputRef: React.RefObject<HTMLInputElement>;
}

export const ContactForm: React.FC<ContactFormProps> = ({
    isUserLoggedIn,
    handleSend,
    emailInputRef,
    messageInputRef,
    nameInputRef,
}) => {
    return (
        <FormContainer
            id="contact-form-container"
            onSubmit={(e) => {
                e.preventDefault();
                handleSend();
            }}
        >
            <FormItemContainer>
                <SmallFont mb={2}>Mail:</SmallFont>
                <FormInput
                    ref={emailInputRef}
                    required
                    type="email"
                    autoFocus
                    name="name"
                />
            </FormItemContainer>
            {!isUserLoggedIn && (
                <FormItemContainer>
                    <SmallFont mb={2}>Name:</SmallFont>
                    <FormInput ref={nameInputRef} type="text" name="name" />
                </FormItemContainer>
            )}
            <FormItemContainer>
                <SmallFont mb={2}>Message:</SmallFont>
                <FormTextAreaInput
                    rows={4}
                    ref={messageInputRef}
                    required
                    name="name"
                />
            </FormItemContainer>
            <FormButtonContainer>
                <Button type="submit" style={FormButtonStyle}>
                    Send
                </Button>
            </FormButtonContainer>
        </FormContainer>
    );
};
