import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Data } from '../../homePage/UserInputContext';
import { useDataDisplay, DataTableDisplayType } from './DataTableContext';
import { useDatasets, DatasetsType, useEntryDelete, DeleteEntryType, useDataTableUpdate, UpdateDataTableType } from '../DatasetsContext';
import { useLanguage, LanguageType } from '../../common/languageContext/LanguageContext';
import { getDateToBeDeleted } from '../utils';

export default function TableColumn ({ heading }: { heading: keyof Data | string }): JSX.Element {
    const dateEntries = document.querySelector('.dataEntry--date');
    const heartDatasets = useDatasets() as DatasetsType[] ;
    const { language } = useLanguage() as LanguageType;
    const { numOfEntries, addDecimalPlace } = useDataDisplay() as DataTableDisplayType;
    const { updateEntry, setUpdatedId } = useDataTableUpdate() as UpdateDataTableType;
    const { setDateToBeDeleted, setIdToBeDeleted, setDeleteConfirmation } = useEntryDelete() as DeleteEntryType;
    
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