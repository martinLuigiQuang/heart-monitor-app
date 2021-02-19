import React, { useContext, useState } from 'react';
import axios from 'axios';

const UserInputContext = React.createContext();
const InputVerificationContext = React.createContext();

export function useInput () {
    return useContext(UserInputContext);
};

export function useInputVerification () {
    return useContext(InputVerificationContext);
};

export default function UserInputProvider ({ children }) {
    const [inputConfirmation, setInputConfirmation] = useState(false);
    const [heartData, setHeartData] = useState([new Date().toDateString(), 0, 0, 0, 0, 'mmol/L']);
    
    function getInput (event) {
        event.preventDefault();
        setInputConfirmation(true);
        return;
    };

    function verifyInput (verified) {
        if (verified) {
            const mongoDBDoc = {
                date: arguments[1],
                heartData: {
                    systolicPressure: arguments[2] ? arguments[2] : null,
                    diastolicPressure: arguments[3] ? arguments[3] : null,
                    heartRate: arguments[4] ? arguments[4] : null,
                    bloodSugar: arguments[5] ? arguments[5] : null,
                    bloodSugarUnit: arguments[5] ? arguments[6] : null
                }
            };
            axios.post('http://localhost:5000/', mongoDBDoc).catch(err => console.log(err));
        };
        setInputConfirmation(false);
        return;
    };

    function handleUnitConversion (event) {
        const oldUnit = heartData[5];
        let localData = [...heartData];
        localData[5] = event.target.value;
        setHeartData(localData);
        if (oldUnit === 'mg/dL' && heartData[4]) {
            event.target.parentNode.children[1].value = Math.ceil(event.target.parentNode.children[1].value * 10 / 18) / 10;
            localData[4] = event.target.parentNode.children[1].value;
            setHeartData(localData);
        } else if (oldUnit === 'mmol/L' && heartData[4]) {
            event.target.parentNode.children[1].value = Math.ceil(event.target.parentNode.children[1].value * 18 * 10) / 10;
            localData[4] = event.target.parentNode.children[1].value;
            setHeartData(localData);
        };
        return;
    };

    function handleInputChange(event, index) {
        const localData = [...heartData];
        localData[index] = event.target.value;
        setHeartData(localData);
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