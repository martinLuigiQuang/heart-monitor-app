import { Data } from '../../homePage/UserInputContext';
import { Language } from '../../languageContext/languages';
import { useLanguage, LanguageType } from '../../languageContext/LanguageContext';
import { useDatasets, DatasetsType, useEntryDelete, DeleteEntryType } from '../DatasetsContext';
import { useDataDisplay, DataTableDisplayType } from './DataTableContext';
import TableColumn from './TableColumn';
import EntryDeleteConfirmation from './EntryDeleteConfirmation';
import Button from '../../button/Button';

export default function DataTable () {
    const heartDatasets = useDatasets() as DatasetsType[];
    const { language } = useLanguage() as LanguageType;
    const { numOfEntries, handleShowMore } = useDataDisplay() as DataTableDisplayType;
    const { idToBeDeleted, dateToBeDeleted } = useEntryDelete() as DeleteEntryType;
    const heartDataHeadings: string[] = ['date', 'systolicPressure', 'diastolicPressure', 'heartRate', 'bloodSugarLevel', ''];

    return (
        <div className="dataTable">
            {
                heartDataHeadings.map(heading => {
                    return (
                        <ul className="dataEntry" key={heading ? heading : "controlPanel"}>
                            <li className="headings">{ heading ? language[heading as keyof Language] : null }</li>
                            <TableColumn heading={ heading as keyof Data} />
                        </ul>
                    );
                })
            }
            <Button
                ariaLabel={ numOfEntries <= 10 ? "show more records" : "show less records"}
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