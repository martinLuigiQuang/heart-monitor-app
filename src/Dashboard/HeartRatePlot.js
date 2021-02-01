import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(window.Plotly);

export default function HeartRatePlot (props) {
    if (props.data && props.language && props.plotWidth) {
        const heartRate = {
            x: props.data.filter(set => set.heartData.heartRate).map(set => new Date(set.date)),
            y: props.data.filter(set => set.heartData.heartRate).map(set => set.heartData.heartRate),
            type: 'bar',
            color: 'green',
            name: props.language.heartRate
        };

        const layout = {
            width: props.plotWidth,
            height: props.plotWidth*0.40,
            xaxis: {
                showgrid: true,
                zeroline: true,
                showline: true
            },
            yaxis: { 
                title: props.language.systolic,
                range: [50, 70],
                showgrid: true,
                zeroline: true,
                showline: true,
            },
            showlegend: false
        };

        return (
            <Plot 
                data={ [heartRate] }
                layout={ layout }
            />
        );
    };
};