import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function DataTable (props) {
    const language = props.language;
    const heartDataEntries = ['date', 'systolicPressure', 'diastolicPressure', 'heartRate', 'bloodSugarLevel', ''];

    function addDecimalPlace(value) {
        return value * 10 % 10 === 0 ? value + '.0' : value;
    };

    return (
        <div className="dataTable">
            {
                heartDataEntries.map(entry => {
                    return (
                        <ul className="dataEntry" key={entry ? entry : "controlPanel"}>
                            <li className="headings">{ entry ? language[entry] : null }</li>
                            {
                                props.data.map(set => {
                                    return (
                                        <li key={`${set._id}_${entry ? entry : "controlPanel"}`}>{ 
                                            entry
                                            ?   entry === 'date'
                                                ?   <Fragment>
                                                        <span className="date">{ set.date.slice(0, 10) }</span>
                                                        <span className="date bold">{ set.date.slice(11) }</span>
                                                    </Fragment>
                                                :   entry === 'bloodSugarLevel'
                                                ?   set.heartData.bloodSugar
                                                    ?   <Fragment>
                                                            <span className="value">{ addDecimalPlace(set.heartData.bloodSugar) }</span>
                                                            <span>{ set.heartData.bloodSugarUnit }</span>
                                                        </Fragment>
                                                    :   'N/A'
                                                :   set.heartData[entry]
                                            :   <Fragment>
                                                    <Link to="/dashboard">{ language.update }</Link> | 
                                                    <Link to="/dashboard" onClick={() => props.delete(set._id)}>{ language.delete }</Link>
                                                </Fragment>
                                        }</li>
                                    );
                                })
                            }
                        </ul>
                    );
                })
            }
        </div>
    );
};