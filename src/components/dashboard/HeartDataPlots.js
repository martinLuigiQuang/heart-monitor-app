import { usePlotWidth } from './PlotWidthContext.js';
import { useLanguage } from '../languageContext/LanguageContext.js';
import { useDatasets } from './DatasetsContext.js';
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(window.Plotly);

export default function HeartDataPlots () {
    const language = useLanguage();
    const plotWidth = usePlotWidth();
    const data = useDatasets();

    const systolicPressure = {
        x: data.filter(set => set.heartData.systolicPressure).map(set => new Date(set.date)),
        y: data.filter(set => set.heartData.systolicPressure).map(set => set.heartData.systolicPressure),
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'},
        name: language.systolicPressure
    };

    const diastolicPressure = {
        x: data.filter(set => set.heartData.diastolicPressure).map(set => new Date(set.date)),
        y: data.filter(set => set.heartData.diastolicPressure).map(set => set.heartData.diastolicPressure),
        yaxis: 'y2',
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'blue'},
        name: language.diastolicPressure
    };

    const heartRate = {
        x: data.filter(set => set.heartData.heartRate).map(set => new Date(set.date)),
        y: data.filter(set => set.heartData.heartRate).map(set => set.heartData.heartRate),
        yaxis: 'y3',
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'green'},
        name: language.heartRate
    };

    const layout = {
        width: plotWidth,
        height: plotWidth*0.62,
        xaxis: {
            showgrid: true,
            zeroline: true,
            showline: true
        },
        yaxis: { 
            title: language.systolicPressure,
            range: [40, 140],
            showgrid: true,
            zeroline: true,
            showline: true,
        },
        yaxis2: {
            title: language.diastolicPressure,
            overlaying: 'y',
            side: 'right',
            range: [20, 120],
            showgrid: true,
            zeroline: true,
            showline: true 
        },
        yaxis3: {
            range: [50, 150],
            overlaying: 'y',
            side: 'right',
            showgrid: false,
            showticklabels: false
        },
        showlegend: true,
        legend: {
            x: 1,
            y: 1,
            xanchor: 'right'
        }
    };

    return (
        <Plot
            data={[
                systolicPressure,
                diastolicPressure,
                heartRate,
            ]}
            layout={ layout }
        />
    );
};