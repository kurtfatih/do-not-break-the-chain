import {
    GoogleAuthProvider,
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from 'firebase/auth';
import React, { createContext, useContext } from 'react';

import { auth } from '../database/firebase';

interface UserContextI {
    // user: {
    //     currentUser: User | null;
    //     loading: boolean;
    // };
    user: User | null;
    isUserLoading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOutCurrentAuth: () => Promise<void>;
    isUserLoggedIn: () => boolean;
    signInWithPasswordAndEmail: (
        email: string,
        password: string,
    ) => Promise<void>;
    createUserWithEmailPasswordAndDisplayName: (
        email: string,
        password: string,
        displayName: string,
    ) => Promise<void>;
}

const UserContext = createContext<UserContextI | null>(null);

export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error(
            'use UserContext provider must be used within the UserContext.Provider',
        );
    }
    return context;
}

export const UserContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [isUserLoading, setIsUserLoading] = React.useState<boolean>(true);
    const isUserLoggedIn = () => (user ? true : false);

    const signOutCurrentAuth = () =>
        signOut(auth)
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.log('error occured when sign out ', error);
                // An error happened.
            });

    const signInWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();

        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            alert(error);
        }
    };
    const signInWithPasswordAndEmail = async (
        email: string,
        password: string,
    ) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert(error);
        }
    };
    const createUserWithEmailPasswordAndDisplayName = async (
        email: string,
        password: string,
        displayName: string,
    ) => {
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            await updateProfile(user, { displayName });
        } catch (error) {
            alert(error);
        }
    };
    // const signUpWithPassword = async (email: string, password: string) => { const emailProvider = new EmailAuthProvider()
    //     try {
    //         await signInWithPopup(auth, emailProvider);
    //     } catch (error) {
    //         alert(error);
    //     }
    // };
    React.useEffect(() => {
        setIsUserLoading(true);
        const unlisten = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            // localStorage.setItem('user', authUser.uid);
            setUser(authUser);
            setIsUserLoading(false);
            // setUserLoading(false);
        });
        return () => {
            unlisten();
        };
    }, []);
    React.useEffect(() => {
        console.log('fired authuser');
        setIsUserLoading(true);
        const unlisten = auth.onAuthStateChanged((authUser) => {
            console.log('fire', authUser);
            // localStorage.setItem('user', authUser.uid);
            setUser(authUser);
            setIsUserLoading(false);
            // setUserLoading(false);
        });
        return () => {
            unlisten();
        };
    }, []);

    return (
        <UserContext.Provider
            value={{
                signInWithGoogle,
                user,
                signOutCurrentAuth,
                isUserLoggedIn: isUserLoggedIn,
                isUserLoading,
                signInWithPasswordAndEmail,
                createUserWithEmailPasswordAndDisplayName,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
