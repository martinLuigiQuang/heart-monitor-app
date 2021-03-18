import { useState, useEffect } from 'react';

export function usePlotWidth (): number {
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

export function getDateToBeDeleted (offsetTop: number, dateEntries: Element | null, preposition: string): string {
    if (dateEntries) {
        const dateNode: HTMLElement = (Array.from(dateEntries.children) as HTMLElement[]).filter(element => element.offsetTop === offsetTop)[0];
        const date: string = (dateNode.children[0] as HTMLElement).innerText;
        const time: string = (dateNode.children[1] as HTMLElement).innerText;
        return `${ date } ${ preposition } ${ time }`;
    };
    return '';
};