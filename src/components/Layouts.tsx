import styled from 'styled-components';

import { backgroundColor } from '../constants/stylesConstants';

export const Body = styled.section`
    display: flex;
    flex: 8;
    height: 100%;
    /* flex-wrap:wrap; */
`;

export const Container = styled.div<{ flexNumber: number }>`
    display: flex;
    flex: ${({ flexNumber }) => flexNumber};
`;
export const ContentBody = styled.div`
    display: flex;
    background-color: ${backgroundColor};
`;
export const MainContentContainer = styled.div`
    display: flex;
    flex: 8;
    flex-wrap: wrap;
`;
export const HeaderContainer = styled.header`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex: 1;
`;
