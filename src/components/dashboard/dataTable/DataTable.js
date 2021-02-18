import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../languageContext/LanguageContext.js';
import { useDatasets, useEntryDeletion, useEntryUpdate } from '../DatasetsContext.js';
// import TableColumn from './TableColumn.js';
import Button from '../../button/Button.js';

export default function DataTable () {
    const language = useLanguage();
    const data = useDatasets();
    const deleteEntry = useEntryDeletion();
    const updateEntry = useEntryUpdate();
    const [ numOfEntries, setNumOfEntries ] = useState(10);
    const [ entryToBeDeleted, setEntryToBeDeleted ] = useState(null);
    const [ idToBeDeleted, setIdToBeDeleted ] = useState(null);
    const [ deleteConfirmation, setDeleteConfirmation ] = useState(false);
    const [ updatedId, setUpdatedId ] = useState(false);
    const heartDataEntries = ['date', 'systolicPressure', 'diastolicPressure', 'heartRate', 'bloodSugarLevel', ''];

    function addDecimalPlace(value) {
        return (value * 10) % 10 === 0 ? value + '.0' : value;
    };

    function handleShowmore(datasets) {
        numOfEntries <= 10 ? setNumOfEntries(datasets.length) : setNumOfEntries(10);
        return;
    };

    function renderDeleteConfirmationMessage(event, id) {
        const dateNode = [...event.target.parentNode.parentNode.parentNode.children[0].children].filter(node => node.offsetTop === event.target.offsetTop)[0];
        const datetime = `${dateNode.firstChild.innerText} ${language.timeAt} ${dateNode.lastChild.innerText}`;
        return (
            <form className={ `overlayConfirmation wrapper ${ deleteConfirmation ? '' : 'hidden' }` } onClick={event => event.preventDefault()}>
                <h3>{ `${ language.deleteConfirmation } ${ datetime } ?` }</h3>
                <div className="buttonsContainer">
                    <Button label={ language.buttonCancel } onClick={() => setDeleteConfirmation(false) }></Button>
                    <Button label={ language.buttonOK } onClick={() => { 
                        setDeleteConfirmation(false);
                        setEntryToBeDeleted(null);
                        setIdToBeDeleted(null);
                        deleteEntry(id);
                    }}></Button>
                </div>
            </form>
        );
    };

    function renderDataColumns(datasets, entry, numOfEntries) {
        return (
            datasets.map( (set, index) => {
                return (
                    index < numOfEntries
                    ?   <li key={`${set._id}_${entry ? entry : "controlPanel"}`}>
                            { 
                                entry
                                ?   entry === 'date'
                                    ?   <Fragment>
                                            <span className="date">{ set.date.slice(0, 10) }</span>
                                            <span className="date bold">{ set.date.slice(11) }</span>
                                        </Fragment>
                                    :   entry === 'bloodSugarLevel'
                                    ?   set.heartData.bloodSugar
                                        ?   addDecimalPlace(set.heartData.bloodSugar)   
                                        :   '-'
                                    :   set.heartData[entry]
                                        ?   set.heartData[entry]
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

    return (
        <div className="dataTable">
            {
                heartDataEntries.map(entry => {
                    return (
                        <ul className="dataEntry" key={entry ? entry : "controlPanel"}>
                            <li className="headings">{ entry ? language[entry] : null }</li>
                            {/* <TableColumn datasets={ data } entry={ entry } numOfEntries={ numOfEntries } ></TableColumn> */}
                            { renderDataColumns(data, entry, numOfEntries) }
                        </ul>
                    );
                })
            }
            <Button
                label={ numOfEntries <= 10 ? language.showMore : language.showLess }
                onClick={ () => handleShowmore(data) }
                disabled={ data.length <= 10 }
            ></Button>
            {
                entryToBeDeleted && idToBeDeleted
                ?   renderDeleteConfirmationMessage(entryToBeDeleted, idToBeDeleted)
                :   ''
            }
        </div>
    );
};