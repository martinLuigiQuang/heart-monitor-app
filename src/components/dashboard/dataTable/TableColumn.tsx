import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Data from '../../../models/types/Data';
import { useDataDisplay } from './DataTableContext';
import DataTable from '../../../models/interfaces/DataTable';
import { useDatasets, useEntryDelete, useDataTableUpdate } from '../DatasetsContext';
import Dataset from '../../../models/types/Dataset';
import UpdateDataTable from '../../../models/interfaces/UpdateDataTable';
import DeleteEntry from '../../../models/interfaces/DeleteEntry';
import { useLanguage } from '../../common/languageContext/LanguageContext';
import Language from '../../../models/interfaces/Language';
import { getDateToBeDeleted } from '../utils';

export default function TableColumn ({ heading }: { heading: keyof Data | string }): JSX.Element {
    const dateEntries = document.querySelector('.dataEntry--date');
    const heartDatasets = useDatasets() as Dataset[] ;
    const { language } = useLanguage() as Language;
    const { numOfEntries, addDecimalPlace } = useDataDisplay() as DataTable;
    const { updateEntry, setUpdatedId } = useDataTableUpdate() as UpdateDataTable;
    const { setDateToBeDeleted, setIdToBeDeleted, setDeleteConfirmation } = useEntryDelete() as DeleteEntry;
    
    // const dummy: Data = {
    //     'systolicPressure': '110',
    //     'diastolicPressure': '70',
    //     'heartRate': '65',
    //     'bloodSugar': '5.5',
    //     'bloodSugarUnit': 'mmol/L'
    // };

    return (
        <Fragment>
            {
                heartDatasets.map( (set, index) => {
                    const ID = set.id ? set.id : set._id + '';
                    return (
                        index < numOfEntries
                        ?   <li key={`${ID}_${heading ? heading : "controlPanel"}`}>
                                { 
                                    heading
                                    ?   heading === 'date'
                                        ?   <Fragment>
                                                <span className="date">{ set.date.slice(0, 10) }</span>
                                                <span className="date bold">{ set.date.slice(11) }</span>
                                            </Fragment>
                                        :   heading === 'bloodSugarLevel'
                                        ?   set.heartData.bloodSugar && set.heartData.bloodSugar !== '0'
                                            ?   addDecimalPlace(parseFloat(set.heartData.bloodSugar))
                                            :   '-'
                                        :   set.heartData[heading as keyof Data] && set.heartData[heading as keyof Data] !== '0'
                                            ?   set.heartData[heading as keyof Data]
                                            :   '-'
                                    :   <Fragment>
                                            <Link to="/dashboard" onClick={() => {
                                                setUpdatedId(ID);
                                                updateEntry(ID, '2021-02-14T05:40', set.heartData);
                                            }}>{ language.update }</Link> | 
                                            <Link to="/dashboard" onClick={event => {
                                                const position: number = (event.target as HTMLElement).offsetTop;
                                                const date: string = getDateToBeDeleted(position, dateEntries, language.timeAt);
                                                setDateToBeDeleted(date);
                                                setIdToBeDeleted(ID);
                                                setDeleteConfirmation(true);
                                            }}>{ language.delete }</Link>
                                        </Fragment>
                                }
                            </li>
                        :   <Fragment key={`hidden_${index}`}></Fragment>
                    );
                })
            }
        </Fragment>
    );
};