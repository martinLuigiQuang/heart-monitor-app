import { useState, useEffect } from 'react';

export default function usePlotWidth () {
    const [ plotWidth, setPlotWidth ] = useState(document.body.clientWidth);
    
    useEffect(() => {
        setPlotWidth(document.body.clientWidth);
        // set width of data plot based on the window inner width
        function handleWindowResize() {
            setPlotWidth(document.body.clientWidth);
        };
        window.onresize = handleWindowResize;

        // remove event listener when component unmounts
        return function cleanup() {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return plotWidth;
};