import React, { useContext, useState } from 'react';
import axios from 'axios';
import UNITS from '../common/unitOptions/units';
import { mmoll_to_mgdl, mgdl_to_mmoll } from '../common/unitOptions/units';
import getCurrentDate, { autoConvertUnits } from './utils';
import Data from '../../models/types/Data';
import HeartData from '../../models/types/HeartData';
import UserInput from '../../models/interfaces/UserInput';
import InputVerification from '../../models/interfaces/InputVerification';

// Create and export UserInputContext 
const UserInputContext = React.createContext<UserInput | undefined> (undefined);
export function useInput () {
    return useContext(UserInputContext);
};

// Create and export InputVerificationContext
const InputVerificationContext = React.createContext<InputVerification | undefined>(undefined);
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
    };

    // Verify and post user's input to MongoDB then close confirmation overlay; if user cancels, only close the confirmation overlay 
    function verifyInput (verified: boolean, date?: string, data?: Data): void {
        if (verified && date && data) {
            const mongoDBDoc: HeartData = {
                date: date,
                heartData: data
            };
            console.log(mongoDBDoc)
            axios.post('http://localhost:5000/', mongoDBDoc).catch(err => console.log(err));
        };
        setInputConfirmation(false);
    };

    // Convert blood sugar level according to user's choice of unitas defined in UNITS
    function handleUnitConversion (newUnit: string, value: string): void {
        const newValue = newUnit === UNITS.MMOLL ? mgdl_to_mmoll(value) : mmoll_to_mgdl(value);
        const newData = {date: heartData.date, heartData: {...heartData.heartData, bloodSugar: newValue, bloodSugarUnit: newUnit}};
        setHeartData(newData);
    };

    // Record new user's input
    function handleInputChange (value: string, key?: keyof Data): void {
        if (key === 'bloodSugar') { console.log('here'); autoConvertUnits(value, heartData.heartData.bloodSugarUnit, handleUnitConversion); console.log((heartData.heartData.bloodSugar)) };
        const newData = key === undefined 
            ?   {date: value, heartData: {...heartData.heartData}}
            :   {date: heartData.date, heartData: {...heartData.heartData, [key]: value}};
        setHeartData(newData);
    };

    return (
        <UserInputContext.Provider value={{ heartData, getInput, handleInputChange, handleUnitConversion }}>
            <InputVerificationContext.Provider value={{ inputConfirmation, verifyInput }}>
                { children }
            </InputVerificationContext.Provider>
        </UserInputContext.Provider>
    );
};