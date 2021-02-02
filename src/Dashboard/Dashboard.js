import { useState, useEffect } from 'react';
import axios from 'axios';
import HeartDataPlots from './HeartDataPlots.js';

export default function Dashboard(props) {
    const language = props.language;
    const [heartDatasets, setHeartDatasets] = useState([]);
    const [plotWidth, setPlotWidth] = useState(window.innerWidth);

    useEffect(() => {
        axios.get('http://localhost:5000/2021')
            .then( data => setHeartDatasets(data.data) )
            .catch( err => console.log(err) );
        function handleWindowResize() {
            setPlotWidth(window.innerWidth);
        };
        window.onresize = handleWindowResize;
        return function cleanup() {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function handleClick(event) {
        console.log(event.target)
    };
    
    return (
        <main onClick={(event) => handleClick(event)}>
            <HeartDataPlots 
                data={heartDatasets} 
                language={language} 
                plotWidth={plotWidth} 
                
            />
        </main>
    );
};