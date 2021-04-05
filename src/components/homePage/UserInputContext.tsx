import React, { useContext, useState } from 'react';
import axios from 'axios';
import UNITS, { UnitsType } from '../common/unitOptions/units';
import { mmoll_to_mgdl, mgdl_to_mmoll } from '../common/unitOptions/units';
import getCurrentDate from './utils';

// Create and export UserInputContext 
export type Data = {
    systolicPressure: string,
    diastolicPressure: string,
    heartRate: string,
    bloodSugar: string,
    bloodSugarUnit: string
}
type HeartData = {
    date: string,
    heartData: Data
};
export type UserInputType = {
    heartData: HeartData,
    getInput: (event: React.SyntheticEvent) => void,
    handleInputChange: (value: string, key?: keyof Data) => void,
    handleUnitConversion: (unit: keyof UnitsType, value: string) => void
}
const UserInputContext = React.createContext<UserInputType | undefined>(undefined);
export function useInput () {
    return useContext(UserInputContext);
};

// Create and export InputVerificationContext
export type InputVerificationType = {
    inputConfirmation: boolean,
    verifyInput: (verified: boolean, date?: string, data?: Data) => void
};
const InputVerificationContext = React.createContext<InputVerificationType | undefined>(undefined);
export function useInputVerification () {
    return useContext(InputVerificationContext);
};

export default function UserInputProvider ({ children }: { children: JSX.Element }): JSX.Element {
    const dummy: HeartData = {
        date: getCurrentDate(),
        heartData: {
            systolicPressure: '',
            diastolicPressure: '',
            heartRate: '',
            bloodSugar: '',
            bloodSugarUnit: 'mmol/L'
        }
    }
    const [inputConfirmation, setInputConfirmation] = useState(false);
    const [heartData, setHeartData] = useState(dummy);
    
    // Prevent default form submission and open input confirmation overlay
    function getInput (event: React.SyntheticEvent): void {
        event.preventDefault();
        setInputConfirmation(true);
        return;
    };

    // Verify and post user's input to MongoDB then close confirmation overlay; if user cancels, only close the confirmation overlay 
    function verifyInput (verified: boolean, date?: string, data?: Data): void {
        if (verified && date && data) {
            const mongoDBDoc: HeartData = {
                date: date,
                heartData: data
            };
            axios.post('http://localhost:5000/', mongoDBDoc).catch(err => console.log(err));
        };
        setInputConfirmation(false);
        return;
    };

    // Convert blood sugar level according to user's choice of unitas defined in UNITS
    function handleUnitConversion (unit: keyof UnitsType, value: string): void {
        const newUnit = UNITS[unit];
        const newValue = newUnit === UNITS.MMOLL ? mgdl_to_mmoll(value) : mmoll_to_mgdl(value);
        const newData = {date: heartData.date, heartData: {...heartData.heartData, bloodSugar: newValue, bloodSugarUnit: newUnit}};
        setHeartData(newData);
        return;
    };

    // Record new user's input
    function handleInputChange (value: string, key?: keyof Data): void {
        const newData = key === undefined 
            ?   {date: value, heartData: {...heartData.heartData}} 
            :   {date: heartData.date, heartData: {...heartData.heartData, [key]: value}};
        setHeartData(newData);
        return;
    };

    return (
        <UserInputContext.Provider value={{ heartData, getInput, handleInputChange, handleUnitConversion }}>
            <InputVerificationContext.Provider value={{ inputConfirmation, verifyInput }}>
                { children }
            </InputVerificationContext.Provider>
        </UserInputContext.Provider>
    );
};