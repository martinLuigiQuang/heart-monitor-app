import { useState, useEffect } from 'react';

export default function usePlotWidth (): number {
    const [ plotWidth, setPlotWidth ] = useState(document.body.clientWidth);
    
    useEffect(() => {
        setPlotWidth(document.body.clientWidth);
        // set width of data plot based on the window inner width
        function handleWindowResize(): void {
            setPlotWidth(document.body.clientWidth);
            return;
        };
        window.onresize = handleWindowResize;

        // remove event listener when component unmounts
        return function cleanup(): void {
            window.removeEventListener('resize', handleWindowResize);
            return;
        };
    }, []);

    return plotWidth;
};