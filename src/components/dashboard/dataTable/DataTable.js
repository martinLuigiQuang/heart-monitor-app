import { useLanguage } from '../../languageContext/LanguageContext.js';
import { useDatasets, useEntryDelete } from '../DatasetsContext.js';
import { useDataDisplay } from './DataTableContext.js';
import TableColumn from './TableColumn.js';
import EntryDeleteConfirmation from './EntryDeleteConfirmation.js';
import Button from '../../button/Button.js';

export default function DataTable () {
    const language = useLanguage();
    const heartDatasets = useDatasets();
    const { numOfEntries, handleShowmore } = useDataDisplay();
    const { idToBeDeleted, entryToBeDeleted } = useEntryDelete();
    const heartDataHeadings = ['date', 'systolicPressure', 'diastolicPressure', 'heartRate', 'bloodSugarLevel', ''];

    return (
        <div className="dataTable">
            {
                heartDataHeadings.map(heading => {
                    return (
                        <ul className="dataEntry" key={heading ? heading : "controlPanel"}>
                            <li className="headings">{ heading ? language[heading] : null }</li>
                            <TableColumn heading={ heading } ></TableColumn>
                        </ul>
                    );
                })
            }
            <Button
                label={ numOfEntries <= 10 ? language.showMore : language.showLess }
                onClick={ () => handleShowmore(heartDatasets) }
                disabled={ heartDatasets.length <= 10 }
            ></Button>
            {
                entryToBeDeleted && idToBeDeleted
                ?   <EntryDeleteConfirmation></EntryDeleteConfirmation>
                :   ''
            }
        </div>
    );
};