import React, { useState, useContext } from 'react';
import { DatasetsType } from '../DatasetsContext';

// Create and export Data Table Display Context
export type DataTableDisplayType = {
    numOfEntries: number,
    addDecimalPlace: (value: number) => string,
    handleShowMore: (datasets: DatasetsType[]) => number
};
const DataTableDisplayContext = React.createContext<DataTableDisplayType | undefined>(undefined);
export function useDataDisplay () {
    return useContext(DataTableDisplayContext);
};

export default function DataTableDisplayProvider ({ children }: { children: JSX.Element }): JSX.Element {
    const [ numOfEntries, setNumOfEntries ] = useState(10);
    
    // Add one decimal place to whole integers
    function addDecimalPlace(value: number | string): string {
        const numericalValue = typeof value === 'string' ? parseFloat(value) : value;
        return (numericalValue * 10) % 10 === 0 ? numericalValue + '.0' : numericalValue + '';
    };

    // Show more heart data records
    function handleShowMore(datasets: DatasetsType[]): number {
        numOfEntries <= 10 ? setNumOfEntries(datasets.length) : setNumOfEntries(10);
        return datasets.length;
    };

    return (
        <DataTableDisplayContext.Provider value={{ numOfEntries, addDecimalPlace, handleShowMore }}>
            { children }
        </DataTableDisplayContext.Provider>
    );
};