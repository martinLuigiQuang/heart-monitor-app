import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(window.Plotly);

export default function HeartDataPlots (props) {
    const systolicPressure = {
        x: props.data.filter(set => set.heartData.systolicPressure).map(set => new Date(set.date)),
        y: props.data.filter(set => set.heartData.systolicPressure).map(set => set.heartData.systolicPressure),
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'},
        name: props.language.systolicPressure
    };

    const diastolicPressure = {
        x: props.data.filter(set => set.heartData.diastolicPressure).map(set => new Date(set.date)),
        y: props.data.filter(set => set.heartData.diastolicPressure).map(set => set.heartData.diastolicPressure),
        yaxis: 'y2',
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'blue'},
        name: props.language.diastolicPressure
    };

    const heartRate = {
        x: props.data.filter(set => set.heartData.heartRate).map(set => new Date(set.date)),
        y: props.data.filter(set => set.heartData.heartRate).map(set => set.heartData.heartRate),
        yaxis: 'y3',
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'green'},
        name: props.language.heartRate
    };

    const layout = {
        width: props.plotWidth,
        height: props.plotWidth*0.62,
        xaxis: {
            showgrid: true,
            zeroline: true,
            showline: true
        },
        yaxis: { 
            title: props.language.systolicPressure,
            range: [40, 140],
            showgrid: true,
            zeroline: true,
            showline: true,
        },
        yaxis2: {
            title: props.language.diastolicPressure,
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