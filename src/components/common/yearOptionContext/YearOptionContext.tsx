import React, { useContext, useState } from "react";
import YearOption from "../../../models/interfaces/YearOption";

const current = new Date();
const currentYear = current.getFullYear();
const currentMonth = current.getMonth() + 1;
// const currentDate = convertToDoubleDigit(current.getDate());

function convertToDoubleDigit(value: number): string {
    return value >= 10 ? '' + value : '0' + value;
};

export function getYearOptions(): string[] {
    return [
        `${currentYear}-${convertToDoubleDigit(currentMonth)}`, 
        `${currentYear}-${convertToDoubleDigit(currentMonth - 1)}`, 
        `${currentYear}-${convertToDoubleDigit(currentMonth - 2)}`,
        `${currentYear}-${convertToDoubleDigit(currentMonth - 3)}`,
        `${currentYear}-${convertToDoubleDigit(currentMonth - 4)}`,
    ];
};

// Create and export YearOptionContext
const YearOptionContext = React.createContext<YearOption | undefined>(undefined);
export function useYearOption () {
    return useContext(YearOptionContext);
};

export default function YearOptionProvider({ children }: {children: JSX.Element}): JSX.Element {
    const [ yearOption, setYearOption ] = useState(`${getYearOptions()[4]}`);

    return (
        <YearOptionContext.Provider value={{ yearOption, setYearOption }}>
            { children }
        </YearOptionContext.Provider>
    );
};