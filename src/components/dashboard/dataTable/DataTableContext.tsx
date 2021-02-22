import React, { useState, useContext } from 'react';
import { DatasetsType } from '../DatasetsContext';

type DataTableDisplayType = {
    numOfEntries: number,
    addDecimalPlace: (value: number) => string,
    handleShowMore: (datasets: DatasetsType[]) => number
};
const DataTableDisplayContext = React.createContext<DataTableDisplayType | undefined>(undefined);
export function useDataDisplay () {
    return useContext(DataTableDisplayContext);
};

export default function DataTableDisplayProvider ({ children }: HTMLElement): JSX.Element {
    const [ numOfEntries, setNumOfEntries ] = useState(10);
    
    function addDecimalPlace(value: number | string): string {
        const numericalValue = typeof value === 'string' ? parseFloat(value) : value;
        return (numericalValue * 10) % 10 === 0 ? numericalValue + '.0' : numericalValue + '';
    };

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