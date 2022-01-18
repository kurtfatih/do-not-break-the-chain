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
    goalDataType,
    goalType,
    goalTypeUpdatableFieldType,
} from '../types/dbTypes';
import { db } from '../database/firebase';
import { useUserContext } from './UserContext';
import { defaultGoalData } from '../constants/dbConstants';

interface DbContextI {
    goalsData: goalDataType[] | null;
    createNewGoalOnDb: () => void;
    deleteGoalOnDb: (id: string) => void;
    updateGoalOnDb: (
        goalId: string,
        fieldsToUpdate: goalTypeUpdatableFieldType,
    ) => Promise<void>;
    createNewContactOnDb: ({
        email,
        name,
        message,
    }: ContactDataSetType) => Promise<void>;
}
export const DbContextProvider: React.FC = ({ children }) => {
    const { user } = useUserContext();
    const [goalsData, setGoalsData] = React.useState<goalDataType[] | null>(
        null,
    );

    //ref that collections document ref query by user id
    const collectionDocumentRefBasedOnUserId = useRef(
        query(
            collection(db, 'goals'),
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
                const goalsArr: goalDataType[] = [];
                querySnapshot.forEach((doc) => {
                    const docdata = doc.data() as goalDataType;
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
            const collectionRef = collection(db, 'goals');
            const docRef = doc(collectionRef);
            const newGoalData: goalType = {
                ...defaultGoalData,
            };
            const newData: goalDataType = {
                user: user?.uid,
                createdAt: serverTimestamp() as Timestamp,
                goalId: docRef.id,
                ...newGoalData,
            };
            await setDoc(docRef, newData);
        } catch (err) {
            alert(err);
        }
    };

    const deleteGoalOnDb = async (id: string) => {
        const newDocRef = doc(db, 'goals', id);
        try {
            await deleteDoc(newDocRef);
        } catch (error) {
            alert(error);
        }
    };

    const updateGoalOnDb = async (
        goalId: string,
        fieldsToUpdate: goalTypeUpdatableFieldType,
    ) => {
        const newDocRef = doc(db, 'goals', goalId);
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
