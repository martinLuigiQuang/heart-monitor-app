import { useState, useEffect } from 'react';
import axios from 'axios';
import PressurePlots from './PressurePlots.js';

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
            console.log('window resize event listener removed')
        };
    }, []);
    
    return (
        <main>
            <div className="bloodPressureData">
                <PressurePlots data={heartDatasets} language={language} plotWidth={plotWidth} />
            </div>
        </main>
    );
};