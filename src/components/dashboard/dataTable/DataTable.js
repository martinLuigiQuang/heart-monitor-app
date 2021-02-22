import { useLanguage } from '../../languageContext/LanguageContext';
import { useDatasets, useEntryDelete } from '../DatasetsContext';
import { useDataDisplay } from './DataTableContext';
import TableColumn from './TableColumn.js';
import EntryDeleteConfirmation from './EntryDeleteConfirmation.js';
import Button from '../../button/Button';

export default function DataTable () {
    const heartDatasets = useDatasets();
    const { language } = useLanguage();
    const { numOfEntries, handleShowMore } = useDataDisplay();
    const { idToBeDeleted, dateToBeDeleted } = useEntryDelete();
    const heartDataHeadings = ['date', 'systolicPressure', 'diastolicPressure', 'heartRate', 'bloodSugarLevel', ''];

    return (
        <div className="dataTable">
            {
                heartDataHeadings.map(heading => {
                    return (
                        <ul className="dataEntry" key={heading ? heading : "controlPanel"}>
                            <li className="headings">{ heading ? language[heading] : null }</li>
                            <TableColumn heading={ heading } />
                        </ul>
                    );
                })
            }
            <Button
                label={ numOfEntries <= 10 ? language.showMore : language.showLess }
                onClick={ () => handleShowMore(heartDatasets) }
                disabled={ heartDatasets.length <= 10 }
            />
            {
                dateToBeDeleted && idToBeDeleted
                ?   <EntryDeleteConfirmation />
                :   ''
            }
        </div>
    );
};