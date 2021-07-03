import React, { useContext, useState, useEffect } from 'react';
import { PORT_8080, PORT_5000 } from '../../host/port';
import axios from 'axios';
import Data from '../../models/types/Data';
import UNITS, { mmoll_to_mgdl, mgdl_to_mmoll } from '../common/unitOptions/units';
import Units from '../../models/types/Units';
import BloodSugarUnit from '../../models/interfaces/BloodSugarUnit';
import { useYearOption, YearOptionType } from '../common/yearOptionContext/YearOptionContext';
import Dataset from '../../models/types/Dataset';
import UpdateDataTable from '../../models/interfaces/UpdateDataTable';
import DeleteEntry from '../../models/interfaces/DeleteEntry';

// Create and export DatasetsContext
const DatasetsContext = React.createContext<Dataset[] | null>(null);
export function useDatasets () {
    return useContext(DatasetsContext);
};

// Create and export BloodSugarUnitContext
const BloodSugarUnitContext = React.createContext<BloodSugarUnit | null>(null);
export function useBloodSugarUnit () {
    return useContext(BloodSugarUnitContext);
};

// Create and export UpdateDataTableContext
const UpdateDataTableContext = React.createContext<UpdateDataTable | null>(null);
export function useDataTableUpdate () {
    return useContext(UpdateDataTableContext);
};

// Create and export DeleteEntryContext
const DeleteEntryContext = React.createContext<DeleteEntry | null>(null);
export function useEntryDelete () {
    return useContext(DeleteEntryContext);
};

export default function DatasetsProvider ({ children }: { children: JSX.Element }): JSX.Element {
    const PORT = PORT_5000;
    const dummy: Dataset[] = [
        {
            id: '-',
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
    const [ bloodSugarUnit, setBloodSugarUnit ] = useState('mmol/L');
    const [ dateToBeDeleted, setDateToBeDeleted ] = useState('');
    const [ idToBeDeleted, setIdToBeDeleted ] = useState('');
    const [ deleteConfirmation, setDeleteConfirmation ] = useState(false);
    const [ updatedId, setUpdatedId ] = useState('');
    
    // Get year option to display corresponding data
    const { yearOption } = useYearOption() as YearOptionType;
    useEffect(() => getData(yearOption), [yearOption]);
    function getData(year: string): void {
        axios.get(`http://localhost:${PORT}/${year}`)
            .then(data => updateBloodSugarLevel(data.data, 'MMOLL' as keyof Units))
            .catch( err => console.log(err) );
        return;
    };
    
    // Delete data entry with the identified id
    function deleteEntry(id: string): void {
        axios.delete(`http://localhost:${PORT}/?id=${id}`)
            .then(data => setHeartDatasets(heartDatasets.filter(set => set.id !== data.data.id)))
            .catch(err => console.log(err));
        return;
    };

    // Update identified data entry with new data
    function updateEntry(id: string, date: string, data: Data): void {
        const updatedDoc = {
            date: date,
            heartData: data
        };
        axios.post(`http://localhost:${PORT}/update/${id}`, updatedDoc)
            .then(data => setHeartDatasets([...heartDatasets, data.data].filter(set => set.id !== id)))
            .catch(err => console.log(err));
        return;
    };

    // Convert blood sugar level based on user's choice of unit
    function handleUnitConversion(value: keyof Units): void {
        if (bloodSugarUnit !== UNITS[value]) {
            setBloodSugarUnit(UNITS[value]);
            updateBloodSugarLevel(heartDatasets, value);
        };
        return;
    };

    // Convert and set blood sugar level and unit
    function updateBloodSugarLevel(datasets: Dataset[], newUnit: keyof Units): void {
        const updatedData = datasets.map(set => {
            const bloodSugar = parseFloat(set.heartData.bloodSugar);
            if (!isNaN(bloodSugar) && set.heartData.bloodSugarUnit !== UNITS[newUnit]) {
                // console.log(bloodSugar)
                set.heartData.bloodSugarUnit = UNITS[newUnit];
                set.heartData.bloodSugar = UNITS[newUnit] === UNITS.MMOLL 
                    ? mgdl_to_mmoll(`${ bloodSugar }`) 
                    : mmoll_to_mgdl(`${ bloodSugar }`);
            };
            return set;
        });
        setHeartDatasets(updatedData);
        return;
    };

    return (
        <DatasetsContext.Provider value={ heartDatasets }>
            <BloodSugarUnitContext.Provider value={{ bloodSugarUnit, handleUnitConversion }}>
                <UpdateDataTableContext.Provider value={{ updateEntry, updatedId, setUpdatedId }}>
                    <DeleteEntryContext.Provider value={{ deleteEntry, dateToBeDeleted, setDateToBeDeleted, idToBeDeleted, setIdToBeDeleted, deleteConfirmation, setDeleteConfirmation }}>
                        { children }
                    </DeleteEntryContext.Provider>
                </UpdateDataTableContext.Provider>
            </BloodSugarUnitContext.Provider>
        </DatasetsContext.Provider>
    );
};