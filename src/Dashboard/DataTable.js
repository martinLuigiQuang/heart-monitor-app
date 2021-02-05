import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

export default function DataTable (props) {
    const [ numOfEntries, setNumOfEntries ] = useState(10);
    const [ entryToBeDeleted, setEntryToBeDeleted ] = useState(null);
    const [ idToBeDeleted, setIdToBeDeleted ] = useState(null);
    const [ deleteConfirmation, setDeleteConfirmation ] = useState(false);
    const language = props.language;
    const heartDataEntries = ['date', 'systolicPressure', 'diastolicPressure', 'heartRate', 'bloodSugarLevel', ''];

    function addDecimalPlace(value) {
        return value * 10 % 10 === 0 ? value + '.0' : value;
    };

    function handleShowmore(datasets) {
        numOfEntries <= 10 ? setNumOfEntries(datasets.length) : setNumOfEntries(10);
        return;
    };

    function renderDeleteConfirmationMessage(event, id) {
        const dateNode = [...event.target.parentNode.parentNode.parentNode.children[0].children].filter(node => node.offsetTop === event.target.offsetTop)[0];
        const datetime = `${dateNode.firstChild.innerText} ${language.timeAt} ${dateNode.lastChild.innerText}`;
        return (
            <form className={`overlayConfirmation wrapper ${deleteConfirmation ? '' : 'hidden'}`} onClick={event => event.preventDefault()}>
                <h3>{ `${language.deleteConfirmation} ${datetime} ?` }</h3>
                <div className="buttonsContainer">
                    <button onClick={() => setDeleteConfirmation(false) }>{ language.buttonCancel }</button>
                    <button onClick={() => { 
                        setDeleteConfirmation(false);
                        setEntryToBeDeleted(null);
                        setIdToBeDeleted(null);
                        props.delete(id);
                    }}>
                        { 
                            language.buttonOK 
                        }
                    </button>
                </div>
            </form>
        );
    };

    function renderDataEntries(datasets, entry, numOfEntries) {
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
                                        <Link to="/dashboard">{ language.update }</Link> | 
                                        <Link to="/dashboard" onClick={(event) => {
                                            setEntryToBeDeleted(event);
                                            setIdToBeDeleted(set._id);
                                            setDeleteConfirmation(true);
                                        }}>
                                            { 
                                                language.delete 
                                            }
                                        </Link>
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
                            {
                                renderDataEntries(props.data, entry, numOfEntries)
                            }
                        </ul>
                    );
                })
            }
            <button onClick={() => handleShowmore(props.data)} disabled={props.data.length <= 10}>
                { 
                    numOfEntries <= 10
                    ?   language.showMore
                    :   language.showLess 
                }
            </button>
            {
                entryToBeDeleted && idToBeDeleted
                ?   renderDeleteConfirmationMessage(entryToBeDeleted, idToBeDeleted)
                :   ''
            }
        </div>
    );
};