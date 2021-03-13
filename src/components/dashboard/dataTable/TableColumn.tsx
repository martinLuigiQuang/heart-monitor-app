import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Data } from '../../homePage/UserInputContext';
import { useDataDisplay, DataTableDisplayType } from './DataTableContext';
import { useDatasets, DatasetsType, useEntryDelete, DeleteEntryType, useDataTableUpdate, UpdateDataTableType } from '../DatasetsContext';
import { useLanguage, LanguageType } from '../../common/languageContext/LanguageContext';

export default function TableColumn ({ heading }: { heading: keyof Data | string }): JSX.Element {
    const heartDatasets = useDatasets() as DatasetsType[];
    const { language } = useLanguage() as LanguageType;
    const { numOfEntries, addDecimalPlace } = useDataDisplay() as DataTableDisplayType;
    const { updateEntry, setState_updatedId } = useDataTableUpdate() as UpdateDataTableType;
    const { setState_dateToBeDeleted, setState_idToBeDeleted, setState_deleteConfirmation } = useEntryDelete() as DeleteEntryType;
    
    const dummy: Data = {
        'systolicPressure': '110',
        'diastolicPressure': '70',
        'heartRate': '65',
        'bloodSugar': '5.5',
        'bloodSugarUnit': 'mmol/L'
    }

    function getDateOfEntryToBeDeleted (event: React.SyntheticEvent): string {
        const target = event.target as HTMLInputElement;
        if (target.parentNode && target.parentNode.parentNode && target.parentNode.parentNode.parentNode && target.parentNode.parentNode.parentNode.children[0].children) {
            const collection: HTMLElement[] = Array.from(target.parentNode.parentNode.parentNode.children[0].children) as HTMLElement[];
            const dateNode: HTMLElement = collection.filter(node => node.offsetTop === target.offsetTop)[0];
            if (dateNode.children[0] && dateNode.children[1]) {
                const firstChild: HTMLElement = dateNode.children[0] as HTMLElement;
                const lastChild: HTMLElement = dateNode.children[1] as HTMLElement;
                const date: string = `${firstChild.innerText} ${language.timeAt} ${lastChild.innerText}`;
                return date;
            } else {
                return '';
            }
        } else {
            return '';
        };
    };

    return (
        <Fragment>
            {
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
                                            ?   addDecimalPlace(parseFloat(set.heartData.bloodSugar))
                                            :   '-'
                                        :   set.heartData[heading as keyof Data] && set.heartData[heading as keyof Data] !== '0'
                                            ?   set.heartData[heading as keyof Data]
                                            :   '-'
                                    :   <Fragment>
                                            <Link to="/dashboard" onClick={() => {
                                                setState_updatedId(set._id);
                                                updateEntry(set._id, '2021-02-14T05:40', set.heartData);
                                            }}>{ language.update }</Link> | 
                                            <Link to="/dashboard" onClick={event => {
                                                const date: string = getDateOfEntryToBeDeleted(event);
                                                setState_dateToBeDeleted(date);
                                                setState_idToBeDeleted(set._id);
                                                setState_deleteConfirmation(true);
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