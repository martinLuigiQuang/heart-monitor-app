import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function TableColumn ({ datasets, entry, numOfEntries }) {
    if (!datasets instanceof Array) datasets = [];
    // return (
    //     datasets.map( (set, index) => {
    //         return (
    //             index < numOfEntries
    //             ?   <li key={`${set._id}_${entry ? entry : "controlPanel"}`}>
    //                     { 
    //                         entry
    //                         ?   entry === 'date'
    //                             ?   <Fragment>
    //                                     <span className="date">{ set.date.slice(0, 10) }</span>
    //                                     <span className="date bold">{ set.date.slice(11) }</span>
    //                                 </Fragment>
    //                             :   entry === 'bloodSugarLevel'
    //                             ?   set.heartData.bloodSugar
    //                                 ?   (set.heartData.bloodSugar * 10) % 10 ? set.heartData.bloodSugar + '.0' : set.heartData.bloodSugar
    //                                 :   '-'
    //                             :   set.heartData[entry]
    //                                 ?   set.heartData[entry]
    //                                 :   '-'
    //                         :   <Fragment>
    //                                 <Link to="/dashboard" onClick={() => {
    //                                     setUpdatedId(set._id);
    //                                     updateEntry(set._id, '2021-02-14T05:40', 10, 0, 0, 0, 'mmol/L');
    //                                 }}>{ language.update }</Link> | 
    //                                 <Link to="/dashboard" onClick={event => {
    //                                     setEntryToBeDeleted(event);
    //                                     setIdToBeDeleted(set._id);
    //                                     setDeleteConfirmation(true);
    //                                 }}>{ language.delete }</Link>
    //                             </Fragment>
    //                     }
    //                 </li>
    //             :   ''
    //         );
    //     })
    // );
};