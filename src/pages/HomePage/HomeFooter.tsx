import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HeartImage from '../../assets/hearth.png';
import { CardContainer } from '../../components/Card';
import { Image } from '../../components/Image';
import { SmallFont } from '../../components/Typography';
import { breakPoints } from '../../constants/stylesConstant';

const HomeFooterCardContainer = styled(CardContainer)`
    width: 100%;
    height: 50%;
    justify-content: center;
    align-items: center;
    display: flex;
    @media (max-width: ${breakPoints.lg}) {
        justify-content: center;
        align-items: flex-start;
        height: 100%;
        border-radius: 0;
    }
`;
export const HomeFooter: React.FC = () => {
    return (
        <Grid container alignItems="flex-end" id="home-header-footer">
            <HomeFooterCardContainer>
                <Link
                    rel="noopener noreferrer"
                    target="blank"
                    style={{ textDecoration: 'none' }}
                    to="//github.com/kurtfatih"
                >
                    <SmallFont style={{ marginRight: '3px' }}>
                        Github @Fatih Kurt
                    </SmallFont>
                </Link>
                <Image width="23" src={HeartImage} />
            </HomeFooterCardContainer>
        </Grid>
    );
};
