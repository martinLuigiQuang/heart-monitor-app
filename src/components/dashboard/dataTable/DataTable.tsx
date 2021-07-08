import Data from '../../../models/types/Data';
import { useLanguage } from '../../common/languageContext/LanguageContext';
import Language from '../../../models/types/Language';
import { useDatasets, useEntryDelete } from '../DatasetsContext';
import { useDataDisplay } from './DataTableContext';
import TableColumn from './TableColumn';
import EntryDeleteConfirmation from './EntryDeleteConfirmation';
import Button from '../../common/button/Button';

export default function DataTable (): JSX.Element | null {
    const heartDatasets = useDatasets();
    const languageObj = useLanguage();
    const dataDisplayObj = useDataDisplay();
    const deleteEntryObj = useEntryDelete();
    const heartDataHeadings: string[] = ['date', 'systolicPressure', 'diastolicPressure', 'heartRate', 'bloodSugarLevel', ''];

    if (dataDisplayObj && languageObj && deleteEntryObj && heartDatasets && heartDatasets.length) {
        const { language } = languageObj;
        const { numOfEntries, handleShowMore } = dataDisplayObj;
        const { idToBeDeleted, dateToBeDeleted } = deleteEntryObj;

        return (
            <div className="dataTable">
                <>
                    {
                        heartDataHeadings.map(heading => {
                            return (
                                <ul className={`dataEntry--${ heading }`} key={heading ? heading : "controlPanel"}>
                                    <li className="headings">{ heading ? language[heading as keyof Language] : null }</li>
                                    <TableColumn heading={ heading as keyof Data} />
                                </ul>
                            );
                        })
                    }
                </>
                <Button
                    ariaLabel={ numOfEntries <= 10 ? "show more records" : "show less records"}
                    label={ numOfEntries <= 10 ? language.showMore : language.showLess }
                    onClick={ () => handleShowMore(heartDatasets) }
                    disabled={ heartDatasets.length <= 10 }
                />
                <>
                    {
                        dateToBeDeleted && idToBeDeleted
                        ?   <EntryDeleteConfirmation />
                        :   ''
                    }
                </>
            </div>
        );
    };

    return null;
};