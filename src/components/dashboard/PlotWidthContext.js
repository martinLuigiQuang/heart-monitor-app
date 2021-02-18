import React, { useContext, useState, useEffect } from 'react';

const PlotWidthContext = React.createContext();

export function usePlotWidth () {
    return useContext(PlotWidthContext);
};

export default function PlotWidthProvider ({ children }) {
    const [ plotWidth, setPlotWidth ] = useState(window.innerWidth);

    useEffect(() => {
        // set width of data plot based on the window inner width
        function handleWindowResize() {
            setPlotWidth(window.innerWidth);
        };
        window.onresize = handleWindowResize;

        // remove event listener when component unmounts
        return function cleanup() {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <PlotWidthContext.Provider value={ plotWidth }>
            { children }
        </PlotWidthContext.Provider>
    );
};