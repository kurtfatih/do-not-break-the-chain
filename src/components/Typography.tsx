import styled from 'styled-components';

import { breakPoints } from '../constants/stylesConstant';

const Font = styled.p<{
    color?: string;
    bolder?: boolean;
    upperCase?: boolean;
    mt?: number;
    mb?: number;
    mr?: number;
    ml?: number;
    isPointer?: boolean;
}>`
    font-family: Helvetica;
    font-weight: ${({ bolder }) => (bolder ? 'bold' : 'normal')};
    text-transform: ${({ upperCase }) => (upperCase ? 'uppercase' : 'none')};
    display: block;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    color: ${({ color }) => color ?? '#fff'};
    ${({ ml }) => ml && `margin-left:${ml + 'px'};`}
    ${({ mb }) => mb && `margin-bottom:${mb + 'px'};`}
    ${({ mt }) => mt && `margin-top:${mt + 'px'};`}
    ${({ mr }) => mr && `margin-right:${mr + 'px'};`}
    ${({ isPointer }) => isPointer && `cursor:pointer;`}
`;
export const SmallFont = styled(Font)`
    font-size: 16px;
    /* @media (max-width: ${breakPoints.sm}) {
        font-size: 8px;
    }
    @media (max-width: ${breakPoints.xs}) {
        font-size: 8px;
    } */
`;
export const MediumFont = styled(Font)`
    font-size: 32px;

    @media (max-width: ${breakPoints.lg}) {
        font-size: 20px;
        margin-top: 5px;
        text-align: left !important;
    }
    @media (max-width: ${breakPoints.md}) {
        font-size: 24px;
    }
    @media (max-width: ${breakPoints.sm}) {
        font-size: 16px;
    }
    @media (max-width: ${breakPoints.xs}) {
        font-size: 8px;
    }
`;
export const LargeFont = styled(Font)`
    font-size: 72px;
    /* @media (max-width: ${breakPoints.lg}) {
        font-size: 50px;
        text-align: left !important;
    } */
    /* @media (max-width: 1280px) {
        font-size: 64px;
        text-align: left !important;
    } */
    /* @media (max-width: ${breakPoints.md}) {
        font-size: 56px;
    } */
    /* @media (max-width: ${breakPoints.sm}) {
        font-size: 48px;
    } */
    /* @media (max-width: ${breakPoints.md}) {
        font-size: 45px;
    } */
`;
