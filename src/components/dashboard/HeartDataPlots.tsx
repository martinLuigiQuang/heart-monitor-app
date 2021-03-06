import { usePlotWidth } from './utils';
import Data from '../../models/types/Data';
import { useLanguage } from '../common/languageContext/LanguageContext';
import { useDatasets } from './DatasetsContext';
import Dataset from '../../models/types/Dataset';
import PlotlyChart from 'react-plotlyjs-ts';

export default function HeartDataPlots (): JSX.Element | null {
    const languageObj = useLanguage();
    const heartDatasets = useDatasets();
    const plotWidth = usePlotWidth();

    function checkDataExistence(set: Dataset, key: keyof Data): boolean {
        return set.heartData[key] !== undefined && set.heartData[key] !== null && set.heartData[key] !== '0';
    };

    if (languageObj && heartDatasets && heartDatasets.length) {

        const { language } = languageObj;

        const systolicPressure = {
            x: heartDatasets.filter(set => checkDataExistence(set, 'systolicPressure')).map(set => new Date(set.date)),
            y: heartDatasets.filter(set => checkDataExistence(set, 'systolicPressure')).map(set => set.heartData.systolicPressure),
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
            name: language.systolicPressure
        };
    
        const diastolicPressure = {
            x: heartDatasets.filter(set => checkDataExistence(set, 'diastolicPressure')).map(set => new Date(set.date)),
            y: heartDatasets.filter(set => checkDataExistence(set, 'diastolicPressure')).map(set => set.heartData.diastolicPressure),
            yaxis: 'y2',
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
            name: language.diastolicPressure
        };
    
        const heartRate = {
            x: heartDatasets.filter(set => checkDataExistence(set, 'heartRate')).map(set => new Date(set.date)),
            y: heartDatasets.filter(set => checkDataExistence(set, 'heartRate')).map(set => set.heartData.heartRate),
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
            <PlotlyChart
                data={[
                    systolicPressure,
                    diastolicPressure,
                    heartRate,
                ]}
                layout={ layout }
            />
        );
    };
    
    return null;
};