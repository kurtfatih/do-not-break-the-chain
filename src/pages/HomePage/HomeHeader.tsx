import { Grid } from '@mui/material';
import React from 'react';

// import styled from 'styled-components';
import { LargeFont, MediumFont } from '../../components/Typography';

// import { breakPoints } from '../../styles/constant';

// const HomeHeaderContainer = styled.div`
//     display: flex;
//     flex: 1;
//     justify-content: center;
//     align-items: center;
//     text-align: center;
//     flex-direction: column;
//     @media (max-width: ${breakPoints.lg}) {
//         align-items: flex-start;
//         justify-content: flex-start;
//         text-align: left;
//     }
// `;

export const HomeHeader: React.FC = () => {
    return (
        <Grid
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            container
            sx={{
                alignItems: {
                    xs: 'flex-start',
                    md: 'flex-start',
                    lg: 'center',
                    xl: 'center',
                },
                justifyContent: {
                    xs: 'flex-start',
                    md: 'flex-start',
                    lg: 'center',
                    xl: 'center',
                },
            }}
            id="home-header-container"
        >
            <LargeFont
                bolder
                upperCase
                style={{
                    textShadow: '3px 3px 0px #85DD89',
                }}
            >
                Do not break the chain
            </LargeFont>
            <MediumFont style={{ fontStyle: 'italic' }}>
                For those who want to make their habit sustainable...
            </MediumFont>
            {/* <SmallFont style={{ marginLeft: '5px' }}>
                        DO NOT BREAK THE CHAIN...
                    </SmallFont>{' '} */}
        </Grid>
    );
};
