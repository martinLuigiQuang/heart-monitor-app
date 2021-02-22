import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create and export DatasetsContext
export type DatasetsType = {
    _id: string,
    date: string,
    heartData: {
        systolicPressure: string,
        diastolicPressure: string,
        heartRate: string,
        bloodSugar: string,
        bloodSugarUnit: string
    }
};
const DatasetsContext = React.createContext<DatasetsType[] | undefined>(undefined);
export function useDatasets () {
    return useContext(DatasetsContext);
};

// Create and export BloodSugarUnitContext
type BloodSugarUnitType = {
    unit: string,
    handleUnitConversion: (event: React.SyntheticEvent) => string  
};
const BloodSugarUnitContext = React.createContext<BloodSugarUnitType | undefined>(undefined);
export function useBloodSugarUnit () {
    return useContext(BloodSugarUnitContext);
};

type UpdateDataTableType = {
    updateEntry: (id: string) => string,
    updatedId: string,
    setState_updatedId: (id: string) => string
};
const UpdateDataTableContext = React.createContext<UpdateDataTableType | undefined>(undefined);
export function useDataTableUpdate () {
    return useContext(UpdateDataTableContext);
};

type DeleteEntryType = {
    deleteEntry: (id: string) => string,
    dateToBeDeleted: string,
    setState_dateToBeDeleted: (date: string) => string,
    idToBeDeleted: string,
    setState_idToBeDeleted: (id: string) => string,
    deleteConfirmation: boolean,
    setState_deleteConfirmation: (confirmed: boolean) => void
};
const DeleteEntryContext = React.createContext<DeleteEntryType | undefined>(undefined);
export function useEntryDelete () {
    return useContext(DeleteEntryContext);
};

export default function DatasetsProvider ({ children }: HTMLElement): JSX.Element {
    const dummy: DatasetsType[] = [
        {
            _id: '-',
            date: '-',
            heartData: {
                systolicPressure: '-',
                diastolicPressure: '-',
                heartRate: '-',
                bloodSugar: '-',
                bloodSugarUnit: '-'
            }
        }
    ];
    const [ heartDatasets, setHeartDatasets ] = useState(dummy);
    const [ unit, setBloodSugarUnit ] = useState('mmol/L');
    const [ dateToBeDeleted, setDateToBeDeleted ] = useState('');
    const [ idToBeDeleted, setIdToBeDeleted ] = useState('');
    const [ deleteConfirmation, setDeleteConfirmation ] = useState(false);
    const [ updatedId, setUpdatedId ] = useState('');

    useEffect(() => {
        // get data from database
        axios.get('http://localhost:5000/2021')
            .then(data => updateBloodSugarLevel(data.data, 'mmol/L'))
            .catch( err => console.log(err) );
    }, []);

    function deleteEntry(id: string): string {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(data => setHeartDatasets(heartDatasets.filter(set => set._id !== data.data._id)))
            .catch(err => console.log(err));
        return id;
    };

    function updateEntry(id: string): string {
        const updatedDoc = {
            date: arguments[1],
            heartData: {
                systolicPressure: arguments[2],
                diastolicPressure: arguments[3],
                heartRate: arguments[4],
                bloodSugar: arguments[5],
                bloodSugarUnit: arguments[5]
            }
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