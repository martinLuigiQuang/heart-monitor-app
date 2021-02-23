import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Data } from '../homePage/UserInputContext';

// Create and export DatasetsContext
export type DatasetsType = {
    _id: string,
    date: string,
    heartData: Data
};
const DatasetsContext = React.createContext<DatasetsType[] | null>(null);
export function useDatasets () {
    return useContext(DatasetsContext);
};

// Create and export BloodSugarUnitContext
type BloodSugarUnitType = {
    unit: string,
    handleUnitConversion: (event: React.SyntheticEvent) => string  
};
const BloodSugarUnitContext = React.createContext<BloodSugarUnitType | null>(null);
export function useBloodSugarUnit () {
    return useContext(BloodSugarUnitContext);
};

export type UpdateDataTableType = {
    updateEntry: (id: string, date: string, data: Data) => string,
    updatedId: string,
    setState_updatedId: (id: string) => string
};
const UpdateDataTableContext = React.createContext<UpdateDataTableType | null>(null);
export function useDataTableUpdate () {
    return useContext(UpdateDataTableContext);
};

export type DeleteEntryType = {
    deleteEntry: (id: string) => string,
    dateToBeDeleted: string,
    setState_dateToBeDeleted: (date: string) => string,
    idToBeDeleted: string,
    setState_idToBeDeleted: (id: string) => string,
    deleteConfirmation: boolean,
    setState_deleteConfirmation: (confirmed: boolean) => void
};
const DeleteEntryContext = React.createContext<DeleteEntryType | null>(null);
export function useEntryDelete () {
    return useContext(DeleteEntryContext);
};

export default function DatasetsProvider ({ children }: { children: JSX.Element }): JSX.Element {
    const dummy: DatasetsType[] = [
        {
            _id: '-',
            date: '-',
            heartData: {
                systolicPressure: '-',
                diastolicPressure: '-',
                heartRate: '-',
                bloodSugar: '-',
                bloodSugarUnit: 'mmol/L'
            }
        }
    ];
    const [ heartDatasets, setHeartDatasets ] = useState(dummy);
    const [ unit, setBloodSugarUnit ] = useState('mmol/L');
    const [ dateToBeDeleted, setDateToBeDeleted ] = useState('');
    const [ idToBeDeleted, setIdToBeDeleted ] = useState('');
    const [ deleteConfirmation, setDeleteConfirmation ] = useState(false);
    const [ updatedId, setUpdatedId ] = useState('');

    useEffect((): void => {
        // get data from database
        axios.get('http://localhost:5000/2021')
            .then(data => updateBloodSugarLevel(data.data, 'mmol/L'))
            .catch( err => console.log(err) );
        return;
    }, []);

    function deleteEntry(id: string): string {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(data => setHeartDatasets(heartDatasets.filter(set => set._id !== data.data._id)))
            .catch(err => console.log(err));
        return id;
    };

    function updateEntry(id: string, date: string, data: Data): string {
        const updatedDoc = {
            date: date,
            heartData: data
        };
        axios.post(`http://localhost:5000/update/${id}`, updatedDoc)
            .then(data => setHeartDatasets([...heartDatasets, data.data].filter(set => set._id !== id)))
            .catch(err => console.log(err));
        return id;
    };

    function handleUnitConversion(event: React.SyntheticEvent): string {
        const target = event.target as HTMLInputElement;
        if (target.value) {
            if (unit !== target.value) {
                setBloodSugarUnit(target.value);
                updateBloodSugarLevel(heartDatasets, target.value);
            };
            return target.value;
        };
        return unit;
    };

    function updateBloodSugarLevel(datasets: DatasetsType[], newUnit: string): string {
        const updatedData = datasets.map(set => {
            if (set.heartData.bloodSugarUnit && set.heartData.bloodSugarUnit !== newUnit) {
                const bloodSugar = parseFloat(set.heartData.bloodSugar);
                set.heartData.bloodSugarUnit = newUnit;
                newUnit === 'mmol/L' && !isNaN(bloodSugar)
                ?   set.heartData.bloodSugar = `${Math.ceil(bloodSugar * 10 / 18) / 10}`
                :   set.heartData.bloodSugar = `${Math.ceil(bloodSugar * 18 * 10) / 10}`;
            };
            return set;
        });
        setHeartDatasets(updatedData);
        return newUnit;
    };

    function setState_updatedId (id: string): string {
        setUpdatedId(id);
        return id;
    };

    function setState_dateToBeDeleted (date: string): string {
        setDateToBeDeleted(date);
        return date;
    };

    function setState_idToBeDeleted (id: string): string {
        setIdToBeDeleted(id);
        return id;
    };

    function setState_deleteConfirmation (confirmed: boolean): void {
        setDeleteConfirmation(confirmed);
        return;
    }

    return (
        <DatasetsContext.Provider value={ heartDatasets }>
            <BloodSugarUnitContext.Provider value={{ unit, handleUnitConversion }}>
                <UpdateDataTableContext.Provider value={{ updateEntry, updatedId, setState_updatedId }}>
                    <DeleteEntryContext.Provider value={{ deleteEntry, dateToBeDeleted, setState_dateToBeDeleted, idToBeDeleted, setState_idToBeDeleted, deleteConfirmation, setState_deleteConfirmation }}>
                        { children }
                    </DeleteEntryContext.Provider>
                </UpdateDataTableContext.Provider>
            </BloodSugarUnitContext.Provider>
        </DatasetsContext.Provider>
    );
};