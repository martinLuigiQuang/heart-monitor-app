import { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './DataTable.js';
import HeartDataPlots from './HeartDataPlots.js';

export default function Dashboard({ language }) {
    const [heartDatasets, setHeartDatasets] = useState([]);
    const [plotWidth, setPlotWidth] = useState(window.innerWidth);
    const [bloodSugarUnit, setBloodSugarUnit] = useState('mmol/L');

    useEffect(() => {
        axios.get('http://localhost:5000/2021')
            .then(data => updateBloodSugarLevel(data.data, 'mmol/L'))
            .catch( err => console.log(err) );
    }, []);

    useEffect(() => {
        function handleWindowResize() {
            setPlotWidth(window.innerWidth);
        };
        window.onresize = handleWindowResize;
        return function cleanup() {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function deleteEntry(id) {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(data => setHeartDatasets(heartDatasets.filter(set => set._id !== data.data._id)))
            .catch(err => console.log(err));
    };

    function handleUnitConversion(event) {
        setBloodSugarUnit(event.target.value);
        updateBloodSugarLevel(heartDatasets, event.target.value);
    };

    function updateBloodSugarLevel(datasets, newUnit) {
        const checkedData = datasets.map(set => {
            if (set.heartData.bloodSugarUnit && set.heartData.bloodSugarUnit !== newUnit) {
                set.heartData.bloodSugarUnit = newUnit;
                newUnit === 'mmol/L'
                ?   set.heartData.bloodSugar = Math.ceil(set.heartData.bloodSugar * 10 / 18) / 10
                :   set.heartData.bloodSugar = Math.ceil(set.heartData.bloodSugar * 18 * 10) / 10;
            };
            return set;
        });
        setHeartDatasets(checkedData);
    };
    
    return (
        <main>
            <div className="bloodSugarUnit">
                <p>{`${language.bloodSugarUnit}:`}</p>
                <input  type="radio" name="bloodSugarUnit" value="mmol/L" id="mmol" checked={bloodSugarUnit === 'mmol/L'} 
                        onChange={(event) => handleUnitConversion(event)}/>
                <label htmlFor="mmol">mmol/L</label>
                <input  type="radio" name="bloodSugarUnit" value="mg/dL" id="mg" checked={bloodSugarUnit === 'mg/dL'}
                        onChange={(event) => handleUnitConversion(event)}/>
                <label htmlFor="mg">mg/dL</label>
            </div>
            <DataTable
                data={heartDatasets}
                language={language}
                deleteEntry={(id) => deleteEntry(id)}
            />
            <HeartDataPlots 
                data={heartDatasets} 
                language={language} 
                plotWidth={plotWidth}
            />
        </main>
    );
};