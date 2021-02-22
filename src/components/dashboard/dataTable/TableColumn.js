import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDataDisplay } from './DataTableContext';
import { useDatasets, useEntryDelete, useDataTableUpdate } from '../DatasetsContext';
import { useLanguage } from '../../languageContext/LanguageContext';

export default function TableColumn ({ heading }) {
    const heartDatasets = useDatasets();
    const { language } = useLanguage();
    const { numOfEntries, addDecimalPlace } = useDataDisplay();
    const { updateEntry, setState_updatedId } = useDataTableUpdate();
    const { setState_dateToBeDeleted, setState_idToBeDeleted, setState_deleteConfirmation } = useEntryDelete();
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
                                ?   set.heartData.bloodSugar && set.heartData.bloodSugar !== '0'
                                    ?   addDecimalPlace(set.heartData.bloodSugar)
                                    :   '-'
                                :   set.heartData[heading] && set.heartData[heading] !== '0'
                                    ?   set.heartData[heading]
                                    :   '-'
                            :   <Fragment>
                                    <Link to="/dashboard" onClick={() => {
                                        setState_updatedId(set._id);
                                        updateEntry(set._id, '2021-02-14T05:40', 10, 0, 0, 0, 'mmol/L');
                                    }}>{ language.update }</Link> | 
                                    <Link to="/dashboard" onClick={event => {
                                        const dateNode = [...event.target.parentNode.parentNode.parentNode.children[0].children].filter(node => node.offsetTop === event.target.offsetTop)[0];
                                        const date = `${dateNode.firstChild.innerText} ${language.timeAt} ${dateNode.lastChild.innerText}`;
                                        setState_dateToBeDeleted(date);
                                        setState_idToBeDeleted(set._id);
                                        setState_deleteConfirmation(true);
                                    }}>{ language.delete }</Link>
                                </Fragment>
                        }
                    </li>
                :   ''
            );
        })
    );
};