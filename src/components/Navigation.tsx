/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ContactPage, Home, LinkOff, Login } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import {
    BottomNavigationAction,
    Grid,
    Paper,
    useMediaQuery,
} from '@mui/material';
import { IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../assets/logo.svg';
import {
    backgroundColor,
    breakPoints,
    darkColor,
    greenColor,
    orangeColor,
    sidebarBackgroundColor,
} from '../constants/stylesConstants';
import { useUserContext } from '../context/UserContext';
import { Image } from './Image';
import { SmallFont } from './Typography';

export const Navigation: React.FC = () => {
    const { user, isUserLoggedIn, signOutCurrentAuth } = useUserContext();
    const matches = useMediaQuery(`(max-width:${breakPoints.lg})`);
    const itemsAlongBar = React.useMemo(() => {
        const item = [
            { text: 'Home', path: '/', showLink: true, icon: <Home /> },
            {
                text: 'Goals',
                path: '/goals',
                showLink: isUserLoggedIn(),
                icon: <LinkOff />,
            },
            {
                text: 'Contact Us',
                path: '/contact-us',
                showLink: true,
                icon: <ContactPage />,
            },
            {
                text: 'Login',
                path: '/login',
                showLink: !isUserLoggedIn(),
                icon: <Login />,
            },
            {
                text: 'LogOut',
                showLink: isUserLoggedIn(),
                icon: <LogoutIcon />,
            },
        ];

        return item;
    }, [isUserLoggedIn]);

    return matches ? (
        <FixedBottomNavigation
            signOutCurrentAuth={signOutCurrentAuth}
            itemsAlongBar={itemsAlongBar}
        />
    ) : (
        <SideBar
            displayName={isUserLoggedIn() ? user!.displayName : ''}
            photoUrl={isUserLoggedIn() ? user!.photoURL : ''}
            signOutCurrentAuth={signOutCurrentAuth}
            itemsAlongBar={itemsAlongBar}
            isUserLoggedIn={isUserLoggedIn()}
        />
    );
};

const FixedBottomNavigation: React.FC<FixedBottomNavigationProps> = ({
    itemsAlongBar,
    signOutCurrentAuth,
}) => {
    return (
        <Paper
            sx={{
                position: 'fixed',
                backgroundColor,
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
            }}
            elevation={3}
        >
            {itemsAlongBar.map(
                ({ text, path, showLink, icon }, index) =>
                    showLink &&
                    (path ? (
                        <Link key={index} to={path}>
                            <BottomNavigationAction
                                label={text}
                                sx={{ color: '#fff' }}
                                icon={icon}
                            />
                        </Link>
                    ) : (
                        <div key={index} onClick={signOutCurrentAuth}>
                            <BottomNavigationAction
                                label={text}
                                sx={{ color: '#fff' }}
                                icon={icon}
                            />
                        </div>
                    )),
            )}
        </Paper>
    );
};

const SideBar: React.FC<SideBarProps> = ({
    itemsAlongBar,
    signOutCurrentAuth,
    isUserLoggedIn,
    displayName,
    photoUrl,
}) => {
    const showPhoto = photoUrl && photoUrl!.length > 0;
    const showDisplayName = displayName && displayName!.length > 0;
    return (
        <Grid
            sx={{
                backgroundColor,
            }}
            lg={2}
            container
            item
        >
            <SideBarItemsContainer>
                <SideBarUpperContainer>
                    <Link style={{ display: 'flex', width: '100%' }} to="/">
                        <SideBarImageContainer>
                            <Image
                                src={Logo}
                                width={20}
                                height={20}
                                alt="_logo"
                            />
                        </SideBarImageContainer>
                    </Link>
                    {isUserLoggedIn && (
                        <SideBarImageContainer>
                            {showPhoto && (
                                <Image
                                    width={65}
                                    height={65}
                                    rounded
                                    alt="Profile picture"
                                    src={photoUrl}
                                />
                            )}
                            {showDisplayName && (
                                <SmallFont upperCase>{displayName}</SmallFont>
                            )}
                        </SideBarImageContainer>
                    )}
                    {itemsAlongBar.map(
                        ({ text, path, showLink, icon }, index) =>
                            showLink &&
                            (path ? (
                                <SideBarLinkItem key={index} to={path}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-evenly',
                                            width: '100%',
                                            textAlign: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <SmallFont bolder upperCase>
                                            {text}
                                        </SmallFont>
                                        <SmallFont upperCase>{icon}</SmallFont>
                                    </div>
                                </SideBarLinkItem>
                            ) : null),
                    )}
                </SideBarUpperContainer>
                <SideBarBottomContainer id="social media footer">
                    {isUserLoggedIn && (
                        <SideBarSignOutButtonContainer
                            onClick={signOutCurrentAuth}
                        >
                            <IconButton>
                                <LogoutIcon htmlColor={'#fff'} />
                            </IconButton>
                        </SideBarSignOutButtonContainer>
                    )}
                </SideBarBottomContainer>
                {/* </div> */}
            </SideBarItemsContainer>
        </Grid>
    );
};

const SideBarItemsContainer = styled.div`
    display: flex;
    background-color: ${sidebarBackgroundColor};
    border-radius: 20px 0px 0px 20px;
    justify-content: center;
    flex-direction: column;
    flex-basis: 100%;
    max-height: 100%;
    flex-grow: 0;
`;
const SideBarUpperContainer = styled.div`
    display: flex;
    flex: 3;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;
    align-items: center;
`;
const SideBarImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: #293241;
    padding: 10px;
    border-radius: 20px;
    width: 100%;
    &:hover {
        background-color: ${orangeColor};
        transition: background-color 0.5 cubic-bezier(0.075, 0.82, 0.165, 1);
    }
`;
const SideBarLinkItem = styled(Link)`
    text-decoration: none;
    display: flex;
    background-color: #293241;
    border-radius: 20px;
    height: 15%;
    max-height: 10%;
    width: 100%;
    align-items: center;
    text-align: center;
    justify-content: center;
    &:hover {
        background-color: ${greenColor};
        color: ${darkColor};
        transition: background-color 0.5 cubic-bezier(0.075, 0.82, 0.165, 1);
    }
`;

const SideBarBottomContainer = styled.div`
    display: flex;
    flex: 2;
    align-items: center;
    justify-content: center;
`;
const SideBarSignOutButtonContainer = styled.div`
    display: flex;
    background-color: #293241;
    &:hover {
        background-color: ${orangeColor};
        transition: background-color 0.5 cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    height: 20%;
    flex-basis: 42.5%;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /* @media (min-width: ${breakPoints.xl}) {
        flex-basis: 35%;
        height: 30%;
    } */
`;
type ItemAlongBarProps = (
    | {
          text: string;
          path: string;
          showLink: boolean;
          icon: JSX.Element;
      }
    | {
          text: string;
          showLink: boolean;
          icon: JSX.Element;
          path?: undefined;
      }
)[];

interface SideBarProps {
    itemsAlongBar: ItemAlongBarProps;
    isUserLoggedIn: boolean;
    signOutCurrentAuth: () => void;
    displayName: string | null;
    photoUrl: string | null;
}
interface FixedBottomNavigationProps {
    signOutCurrentAuth: () => void;
    itemsAlongBar: ItemAlongBarProps;
}
