import {
    Timestamp,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    where,
} from 'firebase/firestore';
import React, { useRef } from 'react';

import {
    ContactDataSetType,
    GoalDataI,
    GoalsDataType,
    GoalTypeUpdatableFieldType,
} from '../types/dbTypes';
import { db } from '../database/firebase';
import { useUserContext } from './UserContext';
import { getDefaultGoalData } from '../constants/dbConstants';

interface DbContextI {
    goalsData: GoalsDataType | null;
    createNewGoalOnDb: () => void;
    deleteGoalOnDb: (id: string) => void;
    updateGoalOnDb: (
        goalId: string,
        fieldsToUpdate: GoalTypeUpdatableFieldType,
    ) => Promise<void>;
    createNewContactOnDb: ({
        email,
        name,
        message,
    }: ContactDataSetType) => Promise<void>;
}

const collectionName =
    process.env.NODE_ENV === 'production'
        ? 'goals'
        : process.env.NODE_ENV === 'development'
        ? 'goals-dev'
        : 'goals-test';

export const DbContextProvider: React.FC = ({ children }) => {
    const { user } = useUserContext();
    const [goalsData, setGoalsData] = React.useState<GoalsDataType | null>(
        null,
    );
    //ref that collections document ref query by user id
    const collectionDocumentRefBasedOnUserId = useRef(
        query(
            collection(db, collectionName),
            where('user', '==', user ? user.uid : ''),
            orderBy('createdAt', 'asc'),
        ),
    );
    const contactCollectionRef = collection(db, 'contact');

    // listen user's goals collection datas.
    React.useEffect(() => {
        const unsub = onSnapshot(
            collectionDocumentRefBasedOnUserId.current,
            (querySnapshot) => {
                const goalsArr: GoalsDataType = [];
                querySnapshot.forEach((doc) => {
                    const docdata = doc.data() as GoalDataI;
                    goalsArr.push(docdata);
                });
                setGoalsData(goalsArr);
            },
        );
        return () => {
            unsub();
        };
    }, []);

    const createNewGoalOnDb = async () => {
        try {
            const collectionRef = collection(db, collectionName);
            const docRef = doc(collectionRef);
            const defaultGoalData = getDefaultGoalData(docRef.id)
            const newGoalData =defaultGoalData
            await setDoc(docRef, newGoalData);
        } catch (err) {
            alert(err);
        }
    };

    const deleteGoalOnDb = async (id: string) => {
        const newDocRef = doc(db, collectionName, id);
        try {
            await deleteDoc(newDocRef);
        } catch (error) {
            alert(error);
        }
    };

    const updateGoalOnDb = async (
        goalId: string,
        fieldsToUpdate: GoalTypeUpdatableFieldType,
    ) => {
        const newDocRef = doc(db, collectionName, goalId);
        const newObj = { ...fieldsToUpdate };
        try {
            await setDoc(newDocRef, newObj, { merge: true });
        } catch (e) {
            alert(e);
        }
    };
    const createNewContactOnDb = async ({
        email,
        name,
        message,
    }: ContactDataSetType) => {
        try {
            const docRef = doc(contactCollectionRef);
            const newData: ContactDataSetType = {
                email,
                name,
                message,
            };
            await setDoc(docRef, newData);
        } catch (err) {
            alert(err);
        }
    };
    // update data
    return (
        <DbContext.Provider
            value={{
                goalsData,
                createNewGoalOnDb,
                deleteGoalOnDb,
                updateGoalOnDb,
                createNewContactOnDb,
            }}
        >
            {children}
        </DbContext.Provider>
    );
};

export const DbContext = React.createContext<DbContextI | null>(null);

export function useDbContext() {
    const context = React.useContext(DbContext);
    if (!context) {
        throw new Error(
            'use DbContext provider must be used within the DbContext.Provider',
        );
    }
    return context;
}
