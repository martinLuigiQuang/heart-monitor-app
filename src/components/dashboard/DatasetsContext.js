import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DatasetsContext = React.createContext();
const BloodSugarUnitContext = React.createContext();
const UpdateDatasetsContext = React.createContext();
const UpdateEntryContext = React.createContext();
const DeleteEntryContext = React.createContext();

export function useDatasets () {
    return useContext(DatasetsContext);
};

export function useBloodSugarUnit () {
    return useContext(BloodSugarUnitContext);
};

export function useDatasetsUpdate () {
    return useContext(UpdateDatasetsContext);
};

export function useEntryDeletion () {
    return useContext(DeleteEntryContext);
};

export function useEntryUpdate () {
    return useContext(UpdateEntryContext);
};

export default function DatasetsProvider ({ children }) {
    const [heartDatasets, setHeartDatasets] = useState([]);
    const [bloodSugarUnit, setBloodSugarUnit] = useState('mmol/L');

    useEffect(() => {
        // get data from database
        axios.get('http://localhost:5000/2021')
            .then(data => updateBloodSugarLevel(data.data, 'mmol/L'))
            .catch( err => console.log(err) );
    }, []);

    function deleteEntry(id) {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(data => setHeartDatasets(heartDatasets.filter(set => set._id !== data.data._id)))
            .catch(err => console.log(err));
    };

    function updateEntry(id) {
        const updatedDoc = {
            date: arguments[1],
            heartData: {
                systolicPressure: arguments[2] ? arguments[2] : null,
                diastolicPressure: arguments[3] ? arguments[3] : null,
                heartRate: arguments[4] ? arguments[4] : null,
                bloodSugar: arguments[5] ? arguments[5] : null,
                bloodSugarUnit: arguments[5] ? arguments[6] : null
            }
        };
        axios.post(`http://localhost:5000/update/${id}`, updatedDoc)
            .then(data => setHeartDatasets([...heartDatasets, data.data].filter(set => set._id !== id)))
            .catch(err => console.log(err));
    };

    function handleUnitConversion(event) {
        if (bloodSugarUnit !== event.target.value) {
            setBloodSugarUnit(event.target.value);
            updateBloodSugarLevel(heartDatasets, event.target.value);
        };
        return;
    };

    function updateBloodSugarLevel(datasets, newUnit) {
        const updatedData = datasets.map(set => {
            if (set.heartData.bloodSugarUnit && set.heartData.bloodSugarUnit !== newUnit) {
                set.heartData.bloodSugarUnit = newUnit;
                newUnit === 'mmol/L'
                ?   set.heartData.bloodSugar = Math.ceil(set.heartData.bloodSugar * 10 / 18) / 10
                :   set.heartData.bloodSugar = Math.ceil(set.heartData.bloodSugar * 18 * 10) / 10;
            };
            return set;
        });
        setHeartDatasets(updatedData);
        return;
    };

    return (
        <DatasetsContext.Provider value={ heartDatasets }>
            <BloodSugarUnitContext.Provider value={ bloodSugarUnit }>
                <UpdateDatasetsContext.Provider value={ handleUnitConversion }>
                    <DeleteEntryContext.Provider value={ deleteEntry }>
                        <UpdateEntryContext.Provider value={ updateEntry }>
                            { children }
                        </UpdateEntryContext.Provider>
                    </DeleteEntryContext.Provider>
                </UpdateDatasetsContext.Provider>
            </BloodSugarUnitContext.Provider>
        </DatasetsContext.Provider>
    );
};