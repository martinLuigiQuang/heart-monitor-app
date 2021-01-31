import Plot from 'react-plotly.js';

function Dashboard(props) {
    return (
        <Plot
            data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: {color: 'red'}
                },
                {
                    x: [1, 2, 3], 
                    y: [2, 5, 3],
                    type: 'bar'
                }
            ]}
            layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
        />
    );
};

export default Dashboard;