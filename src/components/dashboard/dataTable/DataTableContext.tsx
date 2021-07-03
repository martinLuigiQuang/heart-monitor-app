import React, { useState, useContext } from 'react';
import Dataset from '../../../models/types/Dataset';
import DataTable from '../../../models/interfaces/DataTable';

// Create and export Data Table Display Context
const DataTableContext = React.createContext<DataTable | undefined>(undefined);
export function useDataDisplay () {
    return useContext(DataTableContext);
};

export default function DataTableProvider ({ children }: { children: JSX.Element }): JSX.Element {
    const [ numOfEntries, setNumOfEntries ] = useState(10);
    
    // Add one decimal place to whole integers
    function addDecimalPlace(value: number | string): string {
        const numericalValue = typeof value === 'string' ? parseFloat(value) : value;
        return (numericalValue * 10) % 10 === 0 ? numericalValue + '.0' : numericalValue + '';
    };

    // Show more heart data records
    function handleShowMore(datasets: Dataset[]): number {
        numOfEntries <= 10 ? setNumOfEntries(datasets.length) : setNumOfEntries(10);
        return datasets.length;
    };

    return (
        <DataTableContext.Provider value={{ numOfEntries, addDecimalPlace, handleShowMore }}>
            { children }
        </DataTableContext.Provider>
    );
};