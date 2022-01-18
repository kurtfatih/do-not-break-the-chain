import styled from 'styled-components';

import { darkColor } from '../constants/stylesConstants';

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
export const FormItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: space-evenly; */
`;
export const FormButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;
export const FormInput = styled.input`
    background-color: ${darkColor};
    font-size: x-large;
    border: 3px solid #fff;
    border-radius: 10px;
    color: #fff;
    &:focus {
        outline: none !important;
        box-shadow: 0 0 10px #94fa92;
    }
`;
export const FormTextAreaInput = styled.textarea`
    background-color: ${darkColor};
    line-height: 2rem;
    font-size: large;
    padding: 2px;
    border: 3px solid #fff;
    border-radius: 10px;
    color: #fff;
    &:focus {
        outline: none !important;
        box-shadow: 0 0 10px #94fa92;
    }
`;
