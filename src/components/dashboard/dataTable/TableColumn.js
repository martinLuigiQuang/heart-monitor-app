import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDataDisplay } from './DataTableContext.js';
import { useDatasets, useEntryDelete, useDataTableUpdate } from '../DatasetsContext.js';
import { useLanguage } from '../../languageContext/LanguageContext.js';

export default function TableColumn ({ heading }) {
    const language = useLanguage();
    const heartDatasets = useDatasets();
    const { numOfEntries, addDecimalPlace } = useDataDisplay();
    const { updateEntry, setUpdatedId } = useDataTableUpdate();
    const { setEntryToBeDeleted, setIdToBeDeleted, setDeleteConfirmation } = useEntryDelete();
    return (
        heartDatasets.map( (set, index) => {
            return (
                index < numOfEntries
                ?   <li key={`${set._id}_${heading ? heading : "controlPanel"}`}>
                        { 
                            heading
                            ?   heading === 'date'
                                ?   <Fragment>
                                        <span className="date">{ set.date.slice(0, 10) }</span>
                                        <span className="date bold">{ set.date.slice(11) }</span>
                                    </Fragment>
                                :   heading === 'bloodSugarLevel'
                                ?   set.heartData.bloodSugar
                                    ?   addDecimalPlace(set.heartData.bloodSugar)
                                    :   '-'
                                :   set.heartData[heading]
                                    ?   set.heartData[heading]
                                    :   '-'
                            :   <Fragment>
                                    <Link to="/dashboard" onClick={() => {
                                        setUpdatedId(set._id);
                                        updateEntry(set._id, '2021-02-14T05:40', 10, 0, 0, 0, 'mmol/L');
                                    }}>{ language.update }</Link> | 
                                    <Link to="/dashboard" onClick={event => {
                                        setEntryToBeDeleted(event);
                                        setIdToBeDeleted(set._id);
                                        setDeleteConfirmation(true);
                                    }}>{ language.delete }</Link>
                                </Fragment>
                        }
                    </li>
                :   ''
            );
        })
    );
};