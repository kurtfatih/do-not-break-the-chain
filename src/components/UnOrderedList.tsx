import styled from 'styled-components';

import { breakPoints } from '../constants/stylesConstant';

export const UnOrderedList = styled.ul`
    margin: 0;
    margin-inline: 0;
    margin-block: 0;
    padding-inline: 0;
    list-style: none;
    justify-content: center;
    display: flex;
    flex-flow: row wrap;
    gap: 8px 8px;

    /* @media (max-width: ${breakPoints.md}) {
        max-height: 300px;
    } */
`;
