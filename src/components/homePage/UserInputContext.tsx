import React, { useContext, useState } from 'react';
import axios from 'axios';

export type HeartData = {
    date: string,
    heartData: {
        systolicPressure: string,
        diastolicPressure: string,
        heartRate: string,
        bloodSugar: string,
        bloodSugarUnit: string
    }
};
type UserInputType = {
    heartData: HeartData,
    getInput: (event: React.SyntheticEvent) => void,
    handleInputChange: (event: React.SyntheticEvent, key: string) => HeartData
}
const UserInputContext = React.createContext<UserInputType | undefined>(undefined);
const InputVerificationContext = React.createContext();

export function useInput () {
    return useContext(UserInputContext);
};

export function useInputVerification () {
    return useContext(InputVerificationContext);
};

export default function UserInputProvider ({ children }: HTMLElement): JSX.Element {
    const localData: HeartData = {
        date: new Date().toLocaleDateString(),
        heartData: {
            systolicPressure: '',
            diastolicPressure: '',
            heartRate: '',
            bloodSugar: '',
            bloodSugarUnit: ''
        }
    }
    const [inputConfirmation, setInputConfirmation] = useState(false);
    const [heartData, setHeartData] = useState(localData);
    
    function getInput (event: React.SyntheticEvent): void {
        event.preventDefault();
        setInputConfirmation(true);
        return;
    };

    function verifyInput (verified: boolean): void {
        if (verified) {
            const mongoDBDoc: HeartData = {
                date: arguments[1],
                heartData: {
                    systolicPressure: arguments[2],
                    diastolicPressure: arguments[3],
                    heartRate: arguments[4],
                    bloodSugar: arguments[5],
                    bloodSugarUnit: arguments[5]
                }
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
            if (heartData.heartData.bloodSugar && target.parentNode && target.parentNode.children[1]) {
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

    function handleInputChange (event: React.SyntheticEvent, key: K): HeartData {
        const target = event.target as HTMLInputElement;
        if (target.value) {
            // deep copy of original heartData object
            const newData = {date: heartData.date, heartData: {...heartData.heartData}};
            if (key === 'date') {
                newData.date = target.value;
            } else {
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