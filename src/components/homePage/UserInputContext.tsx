import React, { useContext, useState } from 'react';
import axios from 'axios';

// Create and export UserInputContext 
export type Data = {
    'systolicPressure': string,
    'diastolicPressure': string,
    'heartRate': string,
    'bloodSugar': string,
    'bloodSugarUnit': string
}
type HeartData = {
    'date': string,
    'heartData': Data
};
export type UserInputType = {
    heartData: HeartData,
    getInput: (event: React.SyntheticEvent) => void,
    handleInputChange: (event: React.SyntheticEvent, key?: keyof Data) => HeartData,
    handleUnitConversion: (event: React.SyntheticEvent) => string
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
    const localData: HeartData = {
        date: new Date().toLocaleDateString(),
        heartData: {
            systolicPressure: '0',
            diastolicPressure: '0',
            heartRate: '0',
            bloodSugar: '0',
            bloodSugarUnit: 'mmol/L'
        }
    }
    const [inputConfirmation, setInputConfirmation] = useState(false);
    const [heartData, setHeartData] = useState(localData);
    
    function getInput (event: React.SyntheticEvent): void {
        event.preventDefault();
        setInputConfirmation(true);
        return;
    };

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

    function handleUnitConversion (event: React.SyntheticEvent): string {
        const oldUnit = heartData.heartData.bloodSugarUnit;
        const target = event.target as HTMLInputElement;
        const newUnit = target.value;
        if (newUnit === 'mmol/L' || newUnit === 'mg/dL') {
            // deep copy of original heartData object
            const newData = {date: heartData.date, heartData: {...heartData.heartData}};
            // update new blood sugar unit for new data object
            newData.heartData.bloodSugarUnit = newUnit;
            setHeartData(newData);
            // update blood sugar level if reading exists and target.parentNode exists
            if (heartData.heartData.bloodSugar !== '0' && target.parentNode && target.parentNode.children[1]) {
                const targetElement = target.parentNode.children[1] as HTMLInputElement;
                if (oldUnit === 'mg/dL') {
                    // math calculation to round new blood sugar level to one decimal place
                    targetElement.value = `${Math.ceil(parseFloat(targetElement.value) * 10 / 18) / 10}`;
                    // update new blood sugar level for new data object
                    newData.heartData.bloodSugar = targetElement.value;
                    setHeartData(newData);
                } else if (oldUnit === 'mmol/L') {
                    // math calculation to round new blood sugar level to one decimal place
                    targetElement.value = `${Math.ceil(parseFloat(targetElement.value) * 18 * 10) / 10}`;
                    // update new blood sugar level for new data object
                    newData.heartData.bloodSugar = targetElement.value;
                    setHeartData(newData);
                };
            };
            return newUnit;
        } else {
            return oldUnit;
        };
    };

    function handleInputChange (event: React.SyntheticEvent, key?: keyof Data): HeartData {
        const target = event.target as HTMLInputElement;
        if (target.value) {
            // deep copy of original heartData object
            const newData = {date: heartData.date, heartData: {...heartData.heartData}};
            switch (key) {
                case undefined: 
                    newData['date'] = target.value;
                    break;
                default:
                    newData.heartData[key] = target.value;                   
            };
            setHeartData(newData);
            return newData;
        } else {
            return heartData
        };
    };

    return (
        <UserInputContext.Provider value={{ heartData, getInput, handleInputChange, handleUnitConversion }}>
            <InputVerificationContext.Provider value={{ inputConfirmation, verifyInput }}>
                { children }
            </InputVerificationContext.Provider>
        </UserInputContext.Provider>
    );
};