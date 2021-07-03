import { Fragment } from 'react';
import Data from '../../../models/types/Data';
import Language from '../../../models/types/Language';
import { useLanguage } from '../../common/languageContext/LanguageContext';
import LanguageInterface from '../../../models/interfaces/Language';
import { useDatasets, useEntryDelete } from '../DatasetsContext';
import Dataset from '../../../models/types/Dataset';
import DeleteEntry from '../../../models/interfaces/DeleteEntry';
import { useDataDisplay } from './DataTableContext';
import DataTable from '../../../models/interfaces/DataTable';
import TableColumn from './TableColumn';
import EntryDeleteConfirmation from './EntryDeleteConfirmation';
import Button from '../../common/button/Button';

export default function DataTable () {
    const heartDatasets = useDatasets() as Dataset[];
    const { language } = useLanguage() as LanguageInterface;
    const { numOfEntries, handleShowMore } = useDataDisplay() as DataTable;
    const { idToBeDeleted, dateToBeDeleted } = useEntryDelete() as DeleteEntry;
    const heartDataHeadings: string[] = ['date', 'systolicPressure', 'diastolicPressure', 'heartRate', 'bloodSugarLevel', ''];

    return (
        <div className="dataTable">
            <Fragment>
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
            </Fragment>
            <Button
                ariaLabel={ numOfEntries <= 10 ? "show more records" : "show less records"}
                label={ numOfEntries <= 10 ? language.showMore : language.showLess }
                onClick={ () => handleShowMore(heartDatasets) }
                disabled={ heartDatasets.length <= 10 }
            />
            <Fragment>
                {
                    dateToBeDeleted && idToBeDeleted
                    ?   <EntryDeleteConfirmation />
                    :   ''
                }
            </Fragment>
        </div>
    );
};