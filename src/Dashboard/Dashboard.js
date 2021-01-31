import { useState, useEffect } from 'react';
import axios from 'axios';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(window.Plotly);

export default function Dashboard(props) {
    const language = props.language;
    const [heartDatasets, setHeartDatasets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/2021')
            .then(data => {
                setHeartDatasets(data.data);
            })
            .catch(err => console.log(err));
    }, []);

    const systolicPressure = {
        x: heartDatasets.filter(set => set.heartData.systolicPressure).map(set => new Date(set.date)),
        y: heartDatasets.filter(set => set.heartData.systolicPressure).map(set => set.heartData.systolicPressure),
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'},
        name: language.systolic
    };

    const diastolicPressure = {
        x: heartDatasets.filter(set => set.heartData.diastolicPressure).map(set => new Date(set.date)),
        y: heartDatasets.filter(set => set.heartData.diastolicPressure).map(set => set.heartData.diastolicPressure),
        yaxis: 'y2',
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'blue'},
        name: language.diastolic
    };

    const layout = {
        width: 500,
        height: 400,
        yaxis: { 
            title: language.systolic,
            range: [85, 135] 
        },
        yaxis2: {
            title: language.diastolic,
            overlaying: 'y',
            side: 'right',
            range: [50, 100]
        },
        showlegend: false
    };
    
    return (
        heartDatasets
        ?   <Plot
                data={[
                    systolicPressure,
                    diastolicPressure
                ]}
                layout={ layout }
            />
        :   ''
    );
};