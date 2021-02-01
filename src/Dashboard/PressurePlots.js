import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(window.Plotly);

export default function PressurePlots (props) {
    if (props.data && props.language && props.plotWidth) {
        const systolicPressure = {
            x: props.data.filter(set => set.heartData.systolicPressure).map(set => new Date(set.date)),
            y: props.data.filter(set => set.heartData.systolicPressure).map(set => set.heartData.systolicPressure),
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
            name: props.language.systolic
        };
    
        const diastolicPressure = {
            x: props.data.filter(set => set.heartData.diastolicPressure).map(set => new Date(set.date)),
            y: props.data.filter(set => set.heartData.diastolicPressure).map(set => set.heartData.diastolicPressure),
            yaxis: 'y2',
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
            name: props.language.diastolic
        };

        const heartRate = {
            x: props.data.filter(set => set.heartData.heartRate).map(set => new Date(set.date)),
            y: props.data.filter(set => set.heartData.heartRate).map(set => set.heartData.heartRate),
            yaxis: 'y3',
            type: 'bar',
            color: 'green',
            name: props.language.heartRate
        };
    
        const layout = {
            width: props.plotWidth,
            height: props.plotWidth*0.62,
            xaxis: {
                showgrid: true,
                zeroline: true,
                showline: true,
                showticklabels: false 
            },
            yaxis: { 
                title: props.language.systolic,
                range: [85, 135],
                showgrid: true,
                zeroline: true,
                showline: true,
            },
            yaxis2: {
                title: props.language.diastolic,
                overlaying: 'y',
                side: 'right',
                range: [50, 100],
                showgrid: true,
                zeroline: true,
                showline: true 
            },
            yaxis3: { 
                title: props.language.heartRate,
                range: [50, 70],
                overlaying: 'y',
                side: 'right',
                showgrid: true,
                zeroline: true,
                showline: true,
            },
            showlegend: false
        };

        return (
            <Plot
                data={[
                    systolicPressure,
                    diastolicPressure,
                    heartRate
                ]}
                layout={ layout }
            />
        );
    };
};