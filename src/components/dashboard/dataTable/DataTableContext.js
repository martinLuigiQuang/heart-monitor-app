import React, { useState, useContext } from 'react';

const DisplayContext = React.createContext();

export function useDataDisplay () {
    return useContext(DisplayContext);
};

export default function DataTableDisplayProvider ({ children }) {
    const [ numOfEntries, setNumOfEntries ] = useState(10);
    
    function addDecimalPlace(value) {
        return (value * 10) % 10 === 0 ? value + '.0' : value;
    };

    function handleShowmore(datasets) {
        numOfEntries <= 10 ? setNumOfEntries(datasets.length) : setNumOfEntries(10);
        return;
    };

    return (
        <DisplayContext.Provider value={{ numOfEntries, addDecimalPlace, handleShowmore }}>
            { children }
        </DisplayContext.Provider>
    );
};